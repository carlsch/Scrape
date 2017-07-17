
const request = require('request');
const cheerio = require('cheerio');
const Promise = require('Promise');
const fs = require('fs');

class Scrape {
    
    constructor() { 
        this.scrape(); 
    }

    async scrape() {
        const url = "https://sv.wikipedia.org/wiki/Wikipedia:Visste_du_att.../";
        // Only for this <url> site
        const years = [2004];
        let facts = [], finalUrl = '';

        // Loop through every address with 2 sec delay to not stress the server. (Not sure if needed)
        for (const year of years) {
            finalUrl = `${url}${year}`;

            request(finalUrl, function(error, response, html) {
                if(!error){
                    const $ = cheerio.load(html);

                    $('.mw-parser-output p').each(function(i, elm) {
                        facts.push($(this).text());
                        console.log($(this).text());
                    });
                }
            return 0;
            })
            await this.sleep(2000); // Delay some between requests.. let's be gentle
        }
        this.saveArrayToFile(facts);
    }

    /*
    * Helper methods
    */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    saveArrayToFile(arr) {
        const fileName = 'out.json';
        fs.writeFile(fileName, JSON.stringify(arr, null, 4), err => 
            console.log(`Saved to [${fileName}]`)
        )
    }
}

new Scrape();