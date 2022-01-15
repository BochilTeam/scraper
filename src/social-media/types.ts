export interface FacebookDownloader {
	id: string;
	thumbnail: string;
	duration: number;
	result: {
		size?: string;
		ext: string;
		url: string;
		quality: string;
		vcodec?: string;
		fid: string;
		isVideo: boolean;
		isAudio: boolean;
	}[];
}
export interface FacebookDownloaderV2 {
	id: string;
	thumbnail: string;
	result: {
		quality: string;
		url: string;
	}[];
}
export interface GoogleIt {
	info: {
		title?: string;
		type?: string;
		description?: string;
		image?: string[];
	};
	articles: {
		header: string;
		title: string;
		url: string;
		description: string;
	}[];
}
export interface InstagramDownloader {
	thumbnail: Buffer;
	url: string;
}
export type InstagramDownloaderv2 =
	| InstagramDownloader
	| { thumbnail: string; sourceUrl?: string };
export interface TiktokDownloader {
	author: {
		unique_id: string;
		nickname: string;
		avatar: string;
	};
	description: string;
	video: {
		with_watermark: string;
		no_watermark: string;
		no_watermark_raw: string;
	};
	music: string;
}
export type TiktokDownloaderv2 =
	| TiktokDownloader
	| {
			description?: void;
			video: { no_watermark: string; no_watermark_hd: string };
			music?: void;
	  };
export interface TiktokFyp {
	id: string;
	desc: string;
	createdTime: Date;
	video: {
		id: string;
		height: number;
		width: number;
		duration: number;
		ratio: string;
		cover: string;
		originCover: string;
		dynamicCover: string;
		playAddr: string;
		downloadAddr: string;
		shareCover: string[];
		reflowCover: string;
		bitrate: number;
		encodedType: string;
		format: string;
		videoQuality: string;
		encodeUserTag: string;
		codecType: string;
		definition: string;
	};
	author: {
		id: string;
		uniqueId: string;
		nickname: string;
		avatarThumb: string;
		avatarMedium: string;
		avatarLarger: string;
		signature: string;
		verified: boolean;
		secUid: string;
		secret: boolean;
		ftc: boolean;
		relation: number;
		openFavorite: boolean;
		commentSetting: number;
		duetSetting: number;
		stitchSetting: number;
		privateAccount: boolean;
		isADVirtual: boolean;
	};
	music: {
		id: string;
		title: string;
		playUrl: string;
		coverThumb: string;
		coverMedium: string;
		coverLarge: string;
		authorName: string;
		original: boolean;
		duration: number;
		album: string;
	};
	challenges?: {
		id: string;
		title: string;
		desc: string;
		profileThumb: string;
		profileMedium: string;
		profileLarger: string;
		coverThumb: string;
		coverMedium: string;
		coverLarger: string;
		isCommerce: boolean;
	}[];
	stats: {
		diggCount: number;
		shareCount: number;
		commentCount: number;
		playCount: number;
	};
	duetInfo: {
		duetFromId: string;
	};
	originalItem: boolean;
	officalItem: boolean;
	textExtra?: {
		awemeId: string;
		start: number;
		end: number;
		hashtagName: string;
		hashtagId: string;
		type: 1;
		userId: string;
		isCommerce: boolean;
		userUniqueId: string;
		secUid: string;
		subType: number;
	}[];
	secret: boolean;
	forFriend: boolean;
	digged: boolean;
	itemCommentStatus: number;
	showNotPass: boolean;
	vl1: boolean;
	itemMute: boolean;
	authorStats: {
		followingCount: number;
		followerCount: number;
		heartCount: number;
		videoCount: number;
		diggCount: number;
		heart: number;
	};
	privateItem: boolean;
	duetEnabled: boolean;
	stitchEnabled: boolean;
	shareEnabled: boolean;
	isAd: boolean;
	duetDisplay: number;
	stitchDisplay: number;
}

export interface TwitterDownloader {
	quality: string;
	type: string;
	url: string;
	isVideo: boolean;
}
export type TwitterDownloaderv2 = TwitterDownloader | { isVideo?: void };
export interface YoutubeSearch {
	video: {
		authorName: string;
		authorAvatar?: string;
		videoId: string;
		url: string;
		thumbnail: string;
		title: string;
		description?: string;
		publishedTime: string;
		durationH: string;
		durationS: number;
		duration: string;
		viewH: string;
		view: string;
		type: "video";
	}[];
	channel: {
		channelId: string;
		url: string;
		channelName: string;
		avatar: string;
		isVerified: boolean;
		subscriberH: string;
		subscriber: string;
		videoCount: number;
		description: string;
		type: "channel";
	}[];
	playlist: {
		playlistId: string;
		title: string;
		thumbnail: string;
		video: {
			videoId: string;
			title: string;
			durationH: string;
			duration: string;
		}[];
		type: "mix";
	}[];
}

export type YoutubeVideoOrAudio = {
	[key: string]: {
		quality: string;
		fileSizeH: string;
		fileSize: number;
		download(): Promise<string>;
	};
};
export interface YoutubeDownloader {
	id: string;
	v_id?: string;
	thumbnail: string;
	title: string;
	video: YoutubeVideoOrAudio;
	audio: YoutubeVideoOrAudio;
}
