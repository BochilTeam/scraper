import dgram, { Socket } from 'dgram'
import net, { Socket as TCPSocket, NetConnectOpts } from 'net'
import EventEmitter from 'events'

interface Options {
    timeout: number
}

// TODO
export async function statusBedrock(ip: string, port: number, opts: Options = { timeout: 5 * 1000 }) {
}

// TODO
export async function statusJava(ip: string, port: number, opts: Options = { timeout: 5 * 1000 }) {
}

class UDPsocket extends EventEmitter {
    public socket: Socket
    constructor(public ip: string, public port: number, public opts: object) {
        super()
        this.socket = dgram.createSocket('udp4')
    }
    connect() {
        if (!this.socket) return
        this.socket.bind(this.port, this.ip)
    }
}

class TCPsocket extends EventEmitter {
    public socket: TCPSocket
    private data = Buffer.alloc(0)
    constructor(public ip: string, public port: number, public opts: Options) {
        super()
    }
    connect(opts?: NetConnectOpts) {
        this.socket = net.createConnection({
            host: this.ip,
            port: this.port,
            timeout: this.opts.timeout,
            ...opts
        })
    }
    write(data: Uint8Array): Buffer {
        return this.data = Buffer.concat([this.data, data])
    }
    writeVarInt(data: number) {
        var MSB = 0x80
            , REST = 0x7F
            , MSBALL = ~REST
            , INT = Math.pow(2, 31)
        let out = []
        let offset = 0

        while (data >= INT) {
            out[offset++] = (data & 0xFF) | MSB
            data /= 128
        }
        while (data & MSBALL) {
            out[offset++] = (data & 0xFF) | MSB
            data >>>= 7
        }
        out[offset] = data | 0
        return this.write(Buffer.from(out))

        // let buf = Buffer.alloc(0);

        // do {
        //     let temp = data & 0b01111111
        //     data >>>= 7
        //     if (data != 0) {
        //         temp |= 0b10000000
        //     }
        //     buf = Buffer.concat([buf, Buffer.from([temp])])
        // } while (data != 0)
        // return this.write(Buffer.from(buf))
    }
    send() {
        if (!this.socket) this.connect()
        return new Promise((resolve, reject) => {
            this.socket?.write?.(this.data, (err) => {
                if (err) return reject(err)
                return resolve(void 0)
            })
        })
    }
}