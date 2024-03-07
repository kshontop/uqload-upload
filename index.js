const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const videoFilePath = 'D:/movie.mp4';

const videoFileName = 'movie.mp4';

const uploadUrl = 'https://en3.uqload.to/upload/01?X-Progress-ID=XXXXXXXXXXX';

const headers = {
    'Cookie': '',
    'Content-Type': '',
};

async function uploadFile(filePath, fileName, uploadUrl, headers) {
    try {
        const formData = new FormData();
        formData.append('sess_id', '');
        formData.append('file', fs.createReadStream(filePath), { filename: fileName });

        const response = await axios.post(uploadUrl, formData, { headers });
        console.log('File uploaded successfully:', response.data);
    } catch (error) {
        console.error('Error uploading file:', error);
    }
}

uploadFile(videoFilePath, videoFileName, uploadUrl, headers);
