"use strict";

// A) importing librerie
import http from "http";
import url from "url";
import path from "path";
import fs from "fs";
import express from "express";

import cors from "cors";
import dotenv from "dotenv";

// B) configurazione server
const port: number = 3000;
let paginaErr: string = "";
const app: express.Express = express();
//app sarebbe funzione di callback per la creazione del server



app.use(cors());

// Ensure we load the .env located in the server folder,
// regardless of the current working directory.
const __filename = url.fileURLToPath(import.meta.url);
const __dirname_local = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname_local, ".env") });

// C) creazione server
const server: http.Server = http.createServer(app);

server.listen(port, function () {
    console.log("Server in ascolto sulla porta " + port);

    interface FileReadError extends NodeJS.ErrnoException { }
    type FileReadData = Buffer;

    fs.readFile("./static/error.html", function (err: FileReadError | null, content: FileReadData): void {
        if (err)
            paginaErr = "<h1>Risorsa non trovata</h1>";
        else
            paginaErr = content.toString();
    });
});





// D) middleware
//1. request log
app.use("/", function (req: express.Request, res: express.Response, next: express.NextFunction) {
    console.log("Metodo: " + req.method);
    console.log("Original URL: " + req.originalUrl);
    next();
})

// 2. Gestione risorse statiche
app.use("/", express.static("./static"));

// 3. Lettura dei parametri POST
// i parametri post sono restituiti come json all'interno di req.body
// i parametri get sono restituiti come json all'interno di req.query
app.use("/", express.json({ limit: "10mb" }));

app.use("/", function (req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.body && Object.keys(req.body).length > 0) {
        console.log("-------------------\nParametri post: " + JSON.stringify(req.body));
    }
    next();
})

app.get("/api/searchBooks", async (req, res) => {
    const { searchTerm, maxResults, langRestrict, orderBy,subject } = req.query;
    if (!searchTerm) {
        return res.status(400).json({ error: "Manca il termine di ricerca" });
    }
    const baseUrl = "https://www.googleapis.com/books/v1/volumes";
    let url = `${baseUrl}?q=${encodeURIComponent(searchTerm as string)}`;
    if (maxResults) {
        url += `&maxResults=${encodeURIComponent(maxResults as string)}`;
    }
    if (langRestrict) {
        url += `&langRestrict=${encodeURIComponent(langRestrict as string)}`;
    }
    if (orderBy) {
        url += `&orderBy=${encodeURIComponent(orderBy as string)}`;
    }
    if (subject) {
        url += `+subject:${encodeURIComponent(subject as string)}`;
    }

    const apiKey = process.env.GOOGLEBOOKS_API_KEY;
    const encodedInput = encodeURIComponent(searchTerm as string);
    console.log("Chiave API caricata:", process.env.GOOGLEBOOKS_API_KEY ? "SÌ" : "NO");
    console.log("URL finale:", url.replace(apiKey as string, "REDACTED")); // Non loggare la chiave in chiaro
    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorText = await response.text();
            console.error("Errore da Google API:", errorText);
            return res.status(response.status).json({ error: "Google API Error" });
        }
        const data: any = await response.json();

        console.log("Risultati trovati:", data.totalItems);
        res.status(200).json(data.items || []);
    } catch (error) {
        console.error("Errore Google API:", error);
        res.status(500).json({ error: "Errore interno del server" });
    }
});

app.get("/api/getBooksBySubject", async (req, res) => {
    const { subject, maxResults, langRestrict, orderBy } = req.query;

    if (!subject) {
        return res.status(400).json({ error: "Il parametro 'subject' è obbligatorio" });
    }
    const apiKey = process.env.GOOGLEBOOKS_API_KEY;
    const baseUrl = "https://www.googleapis.com/books/v1/volumes";
    
    // Iniziamo con il parametro 'q' che contiene il subject
    let apiUrl = `${baseUrl}?q=subject:${encodeURIComponent(subject as string)}`;

    // Aggiungiamo gli altri parametri solo se esistono nella richiesta GET
    if (maxResults) {
        apiUrl += `&maxResults=${maxResults}`;
    }
    if (langRestrict) {
        // Qui il codice server aggiunge correttamente &langRestrict=valore
        apiUrl += `&langRestrict=${langRestrict}`;
    }
    if (orderBy) {
        apiUrl += `&orderBy=${orderBy}`;
    }

    console.log("Chiamata a Google:", apiUrl);

    try {
        const response = await fetch(apiUrl);
        const data: any = await response.json();
        console.log("Risultati trovati per subject:", data.totalItems);
        res.status(200).json(data.items || []);
    } catch (error) {
        res.status(500).json({ error: "Errore API" });
    }
});

app.get("/api/getSingleBook/:id", async (req, res) => {
    const bookId = req.params.id;
    // GET https://www.googleapis.com/books/v1/volumes/zyTCAlFPjgYC?key=yourAPIKey
    const apiKey = process.env.GOOGLEBOOKS_API_KEY;
    const apiUrl = `https://www.googleapis.com/books/v1/volumes/${encodeURIComponent(bookId)}`;
    try {
        const response = await fetch(apiUrl);
        const data: any = await response.json();
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json({ error: "Errore API" });
    }
});
// F) default root 
app.use("/", function (req: express.Request, res: express.Response) {
    res.status(404);
    if (!req.originalUrl.startsWith("/api/")) {
        res.send(paginaErr);// send serializza in automatico
    }
    else {
        res.send("Risorsa non trovata");
    }
})

// G) gestione errori
app.use("/", function (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    // err.stack contiene l'elenco completo degli errori
    res.status(500);
    res.send(err.message);
    console.log("*********ERROR*********\n" + err.stack)

})