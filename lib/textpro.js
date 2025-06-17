import fetch from 'node-fetch';
import cheerio from 'cheerio';
import cookie from 'cookie';
import FormData from 'form-data';

async function post(url, formdata = {}, cookies) {
    const encode = encodeURIComponent;
    const body = Object.keys(formdata)
        .map((key) => {
            const vals = formdata[key];
            const isArray = Array.isArray(vals);
            const keys = encode(key + (isArray ? "[]" : ""));
            if (!isArray) vals = [vals];
            const out = [];
            for (const valq of vals) out.push(keys + "=" + encode(valq));
            return out.join("&");
        })
        .join("&");
    
    return await fetch(`${url}?${body}`, {
        method: "GET",
        headers: {
            Accept: "*/*",
            "Accept-Language": "en-US,en;q=0.9",
            "User-Agent": "GoogleBot",
            Cookie: cookies,
        },
    });
}

/**
 * TextPro Scraper
 * @function
 * @param {String} url - URL di TextPro, es. https://textpro.me/create-a-mystical-neon-blackpink-logo-text-effect-1180.html
 * @param {String|String[]} text - Testo da elaborare (può essere stringa o array di stringhe)
 * @returns {Promise<String>} URL dell'immagine generata
 */
export async function textpro(url, text) {
    if (!/^https:\/\/textpro\.me\/.+\.html$/.test(url)) {
        throw new Error("URL non valido!");
    }

    const geturl = await fetch(url, {
        method: "GET",
        headers: {
            "User-Agent": "GoogleBot",
        },
    });

    const caritoken = await geturl.text();
    const hasilcookie = geturl.headers
        .get("set-cookie")
        .split(",")
        .map((v) => cookie.parse(v))
        .reduce((a, c) => ({ ...a, ...c }), {});

    let cookies = {
        __cfduid: hasilcookie.__cfduid,
        PHPSESSID: hasilcookie.PHPSESSID,
    };
    
    cookies = Object.entries(cookies)
        .map(([name, value]) => cookie.serialize(name, value))
        .join("; ");

    const $ = cheerio.load(caritoken);
    const token = $('input[name="token"]').attr("value");
    const form = new FormData();

    if (typeof text === "string") text = [text];
    for (const texts of text) form.append("text[]", texts);
    
    form.append("submit", "Go");
    form.append("token", token);
    form.append("build_server", "https://textpro.me");
    form.append("build_server_id", 1);

    const geturl2 = await fetch(url, {
        method: "POST",
        headers: {
            Accept: "*/*",
            "Accept-Language": "en-US,en;q=0.9",
            "User-Agent": "GoogleBot",
            Cookie: cookies,
            ...form.getHeaders(),
        },
        body: form.getBuffer(),
    });

    const caritoken2 = await geturl2.text();
    const token2 = /<div.*?id="form_value".+>(.*?)<\/div>/.exec(caritoken2);
    
    if (!token2) throw new Error("Token non trovato!");

    const prosesimage = await post(
        "https://textpro.me/effect/create-image",
        JSON.parse(token2[1]),
        cookies
    );

    const hasil = await prosesimage.json();
    return `https://textpro.me${hasil.fullsize_image}`;
}