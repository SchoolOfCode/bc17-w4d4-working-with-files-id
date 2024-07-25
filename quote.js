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

export async function addQuote(quoteText) {
    const quoteObject = {
        id : uuidv4(),
        quoteText:  quoteText
     }
    const quotes = await getQuotes()
    quotes.push(quoteObject)
    const quotesString = JSON.stringify(quotes, null, 2)
    await fs.writeFile(fileName, quotesString);
    return quoteObject
}

export async function getRandomQuote() {
    const quotes = await getQuotes()
    const range = quotes.length
    const quotesRange = Math.floor(Math.random() * range)
    return quotes[quotesRange]
}

export async function editQuote(id, quoteText) {
    const quotesString = await getQuotes()
    // const quotesString = JSON.stringify(quotes)
    const quoteIndex = quotesString.findIndex((item) => item.id === id)
    if (quoteIndex === -1) {
        return null
    }
    quotesString[quoteIndex] = { 
        id: id,
        quoteText: quoteText 
    }
    const quotes = JSON.stringify(quotesString)
    await fs.writeFile(fileName, quotes)
    return quotesString[quoteIndex]
}

editQuote("1", "New Quote")

export async function deleteQuote(id) {

}
