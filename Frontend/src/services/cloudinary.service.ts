import { utilService } from "./util.service";

const CLOUD_NAME: string = 'looply';
const UPLOAD_PRESET: string = 'oxageyls';

export const cloudinaryService = {
    uploadFile
}

function uploadFile(ev: any) {
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    const formData = new FormData();
    formData.append('file', ev.target.files[0])
    formData.append('upload_preset', UPLOAD_PRESET);

    return fetch(UPLOAD_URL, {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(res => ({
            id: utilService.makeId(),
            fileName: res.original_filename,
            url: res.secure_url,
            createdAt: Date.now()
        }))
        .catch(err => console.error(err))
}