import fs from "node:fs/promises";
import { v4 as uuidv4 } from "uuid";

const fileName = "quotes.json";

export async function getQuotes() {
    try {
        const data = await fs.readFile(fileName, 'utf-8')
        return JSON.parse(data)
    } catch (error) {
        return "Error"
    }
}

const quoteText = "This is some random quote test";
const result = await addQuote(quoteText);
const result2 = await addQuote(quoteText);
console.log(await getQuotes())

export async function addQuote(quoteText) {
    const quoteObject = {
        id : uuidv4(),
        quoteText:  quoteText
     }
    const quotes = await getQuotes()
    // const quotes = JSON.parse(data);
    quotes.push(quoteObject)
    const quotesString = JSON.stringify(quotes, null, 2)
    await fs.writeFile(fileName, quotesString);
    return quoteObject
}

export async function getRandomQuote() {

}

export async function editQuote(id, quoteText) {

}

export async function deleteQuote(id) {

}
