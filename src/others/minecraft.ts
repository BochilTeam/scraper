
// import dgram, { Socket } from 'dgram'
import EventEmitter from 'events'
import net, { NetConnectOpts, Socket as TCPSocket } from 'net'
import { ScraperError } from '../utils.js'
import type { MinecraftJava } from './types'
interface Options {
	timeout: number;
}

// TODO
export async function statusBedrock (
  ip: string,
  port: number,
  opts: Options = { timeout: 5 * 1000 }
) { }

// TODO: fix connection timeout
export function statusJava (
  ip: string,
  port: number = 25565,
  opts: Options = { timeout: 5 * 1000 }
): Promise<MinecraftJava> {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    setTimeout(() => reject(new ScraperError('timeout')), opts.timeout)
    // reference https://github.com/PassTheMayo/minecraft-server-util/blob/master/src/status.ts
    const socket = new TCPsocket(ip, port, opts, reject)

    // https://wiki.vg/Server_List_Ping#Handshake
    socket.writeVarInt(0x00)
    socket.writeVarInt(47)
    socket.writeStringVarInt(ip)
    socket.writeUnsignedShort(port)
    socket.writeVarInt(1)
    await socket.send()

    // https://wiki.vg/Server_List_Ping#Request
    socket.writeVarInt(0x00)
    socket.send()
    await socket.waitForResponse()

    socket.readVarInt()
    const responseId = socket.readVarInt()
    // eslint-disable-next-line eqeqeq
    if (responseId == -1) reject(new Error('Premature end of stream'))
    // eslint-disable-next-line eqeqeq
    if (responseId != 0x00) reject(new Error('Invalid responseId'))
    // https://wiki.vg/Protocol#Response
    const response: MinecraftJava['originalResponse'] = JSON.parse(socket.readStringVarInt())
    // https://wiki.vg/Server_List_Ping#Ping
    socket.writeVarInt(0x01)
    const ping = Date.now()
    socket.writeVarLong(ping)
    socket.send()
    await socket.waitForResponse()

    const pong = Date.now() - ping
    socket.close()
    resolve({
      ip,
      port,
      description: response.description.extra.map(({ text }) => text.trim()).join(' ').trim(),
      descriptionText: response.description.text.trim(),
      players: {
        max: response.players.max,
        online: response.players.online,
        sample: response.players.sample.map(({ name }) => name.trim())
      },
      version: {
        name: response.version.name,
        protocol: response.version.protocol
      },
      favicon: response.favicon ?? null,
      ping: pong,
      originalResponse: response
    })
  })
}

// class UDPsocket extends EventEmitter {
// 	public socket: Socket;
// 	constructor (public ip: string, public port: number, public opts: object) {
// 	  super()
// 	  this.socket = dgram.createSocket('udp4')
// 	}

// 	connect () {
// 	  if (!this.socket) return
// 	  this.socket.bind(this.port, this.ip)
// 	}
// }

class TCPsocket extends EventEmitter {
	public socket: TCPSocket | undefined;
	private data: Uint8Array = Buffer.alloc(0);
	public response: Uint8Array = Buffer.alloc(0);
	constructor (
		public ip: string,
		public port: number,
		public opts: Options,
		public reject: (err: Error) => void
	) {
	  super()
	}

	connect (opts?: NetConnectOpts) {
	  this.socket = net.createConnection({
	    host: this.ip,
	    port: this.port,
	    timeout: this.opts.timeout,
	    ...opts
	  })
	  this.socket.on('data', (data) => {
	    this.response = Buffer.concat([this.response, data])
	    this.emit('data', data, this.response)
	  })
	  this.socket.on('connect', () => {
	    this.emit('connect')
	  })
	  this.socket.on('close', () => {
	    // this.reject(new ScraperError('Connection closed'));
	    this.emit('close')
	  })
	  this.socket.on('error', () => {
	    this.reject(new ScraperError('Connection error'))
	    this.emit('error')
	  })
	  this.socket.on('timeout', () => {
	    this.reject(new ScraperError('Connection timeout'))
	    this.emit('timeout')
	  })
	}

	write (data: Uint8Array): Buffer {
	  return (this.data = Buffer.concat([this.data, data]))
	}

	writeVarInt (value: number, save = true) {
	  const buffer = Buffer.alloc(5)
	  let i = 0
	  do {
	    buffer[i++] = value & 0x7f | 0x80
	    value >>= 7
	  } while (value > 0)
	  buffer[i - 1] &= 0x7f
	  const result = buffer.slice(0, i)
	  if (save) this.write(result)
	  return result
	}

	writeVarLong (value: number) {
	  const buffer = Buffer.alloc(9)
	  let i = 0
	  do {
	    buffer[i++] = value & 0x7f | 0x80
	    value >>= 7
	  } while (value > 0)
	  buffer[i - 1] &= 0x7f
	  const result = buffer.slice(0, i)
	  this.write(result)
	  return result
	}

	writeStringVarInt (value: string) {
	  this.writeVarInt(value.length)
	  this.write(Buffer.from(value, 'utf8'))
	}

	writeUnsignedShort (value: number) {
	  this.write(Buffer.from([value >> 8, value & 0xff]))
	}

	readVarInt () {
	  let result = 0
	  let i = 0
	  let b: number
	  do {
	    b = this.response[i++]
	    result |= (b & 0x7f) << (7 * i)
	  } while (b & 0x80)
	  this.response = this.response.slice(i)
	  return result
	}

	readVarLong () {
	  let result = 0
	  let i = 0
	  let b: number
	  do {
	    b = this.response[i++]
	    result |= (b & 0x7f) << (7 * i)
	  } while (b & 0x80)
	  this.response = this.response.slice(i)
	  return result
	}

	readStringVarInt () {
	  let length = 0
	  let i = 0
	  let b: number
	  do {
	    b = this.response[i++]
	    length |= (b & 0x7f) << (7 * i)
	  } while (b & 0x80)
	  // @ts-ignore
	  const result = this.response.slice(i, i + length).toString('utf8')
	  this.response = this.response.slice(i + length)
	  return result
	}

	readInt64BE () {
	  // @ts-ignore
	  const result = this.response.slice(0, 8).readBigInt64BE(0)
	  this.response = this.response.slice(8)
	  return result
	}

	send () {
	  if (!this.socket) this.connect()
	  return new Promise<void>((resolve, reject) => {
	    this.response = Buffer.alloc(0)
	    // https://gist.github.com/zh32/7190955#file-serverlistping17-java-L92
	    // https://github.com/PassTheMayo/minecraft-server-util/blob/68a7a16beb48226cdd5b63c45604fd3bea6c12ca/src/structure/TCPClient.ts#L464
	    const data = Buffer.concat([this.writeVarInt(this.data.byteLength, false), this.data])

	    this.socket?.write?.(data, (err) => {
	      if (err) return reject(err)
	      resolve()
	    })
	    this.data = Buffer.alloc(0)
	  })
	}

	close () {
	  this.socket?.end?.()
	  this.socket?.destroy?.()
	  this.socket?.removeAllListeners?.()
	}

	waitForResponse () {
	  return new Promise<void>((resolve) => {
	    const timeout = setTimeout(resolve, 250)
	    this.on('data', () => {
	      // @ts-ignore
	      timeout.refresh()
	    })
	  })
	}
}
