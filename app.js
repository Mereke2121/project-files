import { upload } from "./upload.js"

upload("#file", {
    multi: true,
    accept: ['.png', '.jpg', '.gif']
})