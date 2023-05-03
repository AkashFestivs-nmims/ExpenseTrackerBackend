const ImageKit = require('imagekit')

const imagekit = new ImageKit({
    publicKey: process.env.PUBLIC_IMAGEKIT_URL,
    privateKey: process.env.PRIVATE_IMAGEKIT_URL,
    urlEndpoint: process.env.IMAGE_KIT_URL
});

async function uploadImage(fileName, buffer) {
    return await imagekit.upload({
        file: buffer, //required
        fileName: fileName, //required
        folder: 'mail'
    });
}
module.exports = { imagekit, uploadImage };