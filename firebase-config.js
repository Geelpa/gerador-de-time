const firebaseConfig = {
    apiKey: "AIzaSyBH9pIWD9c75whLYdF7fqMd0LLB_T9p0qU",
    authDomain: "gerador-de-times-d57d5.firebaseapp.com",
    projectId: "gerador-de-times-d57d5",
    storageBucket: "gerador-de-times-d57d5.firebasestorage.app",
    messagingSenderId: "537110450644",
    appId: "1:537110450644:web:748ddf8eaa5a78fbf38641"
};
// Inicializa Firebase
firebase.initializeApp(firebaseConfig);

// Exporta o Firestore
const db = firebase.firestore();