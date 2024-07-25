import fs from "node:fs/promises";
import { v4 as uuidv4 } from "uuid";

const fileName = "quotes.json";

export async function getQuotes() {
    try {
        const data = await fs.readFile(fileName, 'utf-8')
        return data
    } catch (error) {
        return "Error"
    }
}

const quoteText = "This is some random quote test";
const result = await addQuote(quoteText);
const result2 = await addQuote(quoteText);
console.log(await getQuotes())

export async function addQuote(quoteText) {
    const randId = uuidv4()
    const quoteObject = {
        "textId" : randId,
        "text" :  quoteText
     }
    const data = await getQuotes()
    const quotes = JSON.parse(data);
    quotes.push(quoteObject)
    const quotesString = JSON.stringify(quotes)
    const promise = await fs.writeFile("quotes.json", quotesString);
}

export async function getRandomQuote() {

}

export async function editQuote(id, quoteText) {

}

export async function deleteQuote(id) {

}
