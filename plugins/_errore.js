import fetch from 'node-fetch'

export async function before(m, { conn }) {
//let img = await (await fetch(`https://tinyurl.com/2c5hk765`)).buffer()
let catalogo = './storage/img/rodrick.png'
let img = catalogo
 global.rcanal = {
    contextInfo: {
    	isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363391446013555@newsletter",
      serverMessageId: 100,
      newsletterName: 'canale dei meme 🎌',
    },
	    externalAdReply: {
				    showAdAttribution: true,
					title: '[ ⚠ ] 𝐄𝐑𝐑𝐎𝐑𝐄',
					body: 'sei stato inculato',
					mediaUrl: null,
					description: '',
					previewType: "PHOTO",
					//thumbnailUrl: 'https://i.ibb.co/SD1vv3xG/file.jpg  ,
                    thumbnailUrl: 'https://i.pinimg.com/736x/3a/b9/0b/3ab90b7ef141837e9eef90424f58e1b4.jpg',
		           sourceUrl: '',
		           mediaType: 1,
                   renderLargerThumbnail: true
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
		           sourceUrl: '',
		           mediaType: 1,
                   renderLargerThumbnail: true
				}
			}
		}
}
