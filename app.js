import firebase from 'firebase/app'
import 'firebase/storage'
import { upload } from "./upload.js"

const firebaseConfig = {
    apiKey: "AIzaSyB6svu6XO_i65S5uFagEC0m1qd9BAou71M",
    authDomain: "test-be6ce.firebaseapp.com",
    projectId: "test-be6ce",
    storageBucket: "test-be6ce.appspot.com",
    messagingSenderId: "356746328268",
    appId: "1:356746328268:web:2d0a9f1a18a633f6aeaa69",
    measurementId: "G-1Z3PMYGDTT"
}
 // Initialize Firebase
firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()



upload("#file", {
    multi: true,
    accept: ['.png', '.jpg', '.gif'],
    onUpload(files, blocks) {
        files.forEach((file, index) => {
            const ref = storage.ref(`images/${file.name}`)
            const task = ref.put(file)

            task.on('state_changed', snapshot => {
                const percentage = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0)
                const block = blocks[index].querySelector('.preview-info-progress')
                block.textContent = percentage
                block.style.width = percentage + '%'  
            }, error => {
                console.log(error)
            }, () => {
                task.snapshot.ref.getDownloadURL().then(url => {
                    console.log(url)
                })
            })
        });
    }
})