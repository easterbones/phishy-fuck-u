import fetch from 'node-fetch'

export async function before(m, { conn }) {
//let img = await (await fetch(`https://tinyurl.com/2c5hk765`)).buffer()
let catalogo = './storage/img/rodrick.png'
let img = catalogo
 global.phishy = {
    contextInfo: {
    	isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363400725128794@newsletter",
      serverMessageId: 100,
      newsletterName: 'novita del bot 🎌',
    },
	    externalAdReply: {
				    showAdAttribution: true,
					title: 'phishy',
					body: 'by easterbone',
					mediaUrl: null,
					description: '',
					previewType: "PHOTO",
					//thumbnailUrl: 'https://i.ibb.co/SD1vv3xG/file.jpg  ,
                    thumbnailUrl: 'https://th.bing.com/th/id/OIP.hCV8bnTiDSt3FV-taV8P3gHaIO?rs=1&pid=ImgDetMain',
		           sourceUrl: '',
		           mediaType: 1,
                   renderLargerThumbnail: false
	    },
    },
  }

 global.adReply = {
	    contextInfo: { 
             forwardingScore: 9999, 
                 isForwarded: false, 
                    externalAdReply: {
				    showAdAttribution: true,
					title: 'ciao',
					body: 'cohones',
					mediaUrl: null,
					description: null,
					previewType: "PHOTO",
					thumbnailUrl: img,
                    thumbnail: img,
		           sourceUrl: 'https://www.tiktok.com/@viridi.celesti?_t=ZN-8tdUIAxqAyM&_r=1',
		           mediaType: 1,
                   renderLargerThumbnail: true
				}
			}
		}
}
