const puppeteer = require('puppeteer');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 10000;

app.get('/', (req, res) => {
    res.send('TikTok Automation Bot is running 24/7!');
});

app.listen(PORT, () => {
    console.log(`Web server running on port ${PORT}`);
});

// --- TASK 1: Leofame (Every 24 hours and 2 minutes) ---
async function runLeofame() {
    console.log('[Task 1] Starting Leofame automation...');
    const browser = await puppeteer.launch({
        headless: true,
        executablePath: await puppeteer.executablePath(),
        args: [
            '--no-sandbox', 
            '--disable-setuid-sandbox', 
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu'
        ]
    });

    try {
        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 800 });

        await page.goto('https://leofame.com/free-tiktok-likes', { waitUntil: 'networkidle2' });
        
        await page.waitForSelector('input', { timeout: 15000 });
        await page.type('input', 'https://vt.tiktok.com/ZSVNLu9Uy/', { delay: 100 });
        
        const clicked = await page.evaluate(() => {
            const buttons = Array.from(document.querySelectorAll('button'));
            const targetButton = buttons.find(b => b.innerText.includes('Get free Likes'));
            if (targetButton) {
                targetButton.click();
                return true;
            }
            return false;
        });

        if (clicked) {
            console.log('[Task 1] Leofame form submitted successfully!');
        } else {
            console.log('[Task 1] Could not find Leofame button.');
        }
    } catch (error) {
        console.error('[Task 1 Error]', error);
    } finally {
        await browser.close();
    }
}

// --- TASK 2: SMM-Hub (Every 4 hours and 2 minutes) ---
async function runSmmHub() {
    console.log('[Task 2] Starting SMM-Hub automation...');
    const browser = await puppeteer.launch({
        headless: true,
        executablePath: await puppeteer.executablePath(),
        args: [
            '--no-sandbox', 
            '--disable-setuid-sandbox', 
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu'
        ]
    });

    try {
        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 800 });

        await page.goto('https://smm-hub.com/en/free_checkout/index/tiktok_likes_free', { waitUntil: 'networkidle2' });

        await page.waitForSelector('input[type="email"], input', { timeout: 15000 });
        
        const emailInput = await page.$('input[type="email"]');
        if (emailInput) {
            await emailInput.type('faisalalkhatib9@gmail.com', { delay: 100 });
        }

        const textInputs = await page.$$('input[type="text"]');
        if (textInputs.length > 0) {
            await textInputs[textInputs.length - 1].type('https://vt.tiktok.com/ZSVNLu9Uy/', { delay: 100 });
        }

        const checkbox = await page.$('input[type="checkbox"]');
        if (checkbox) {
            await checkbox.click();
        }

        const clicked = await page.evaluate(() => {
            const buttons = Array.from(document.querySelectorAll('button'));
            const targetButton = buttons.find(b => b.innerText.includes('Get for free'));
            if (targetButton) {
                targetButton.click();
                return true;
            }
            return false;
        });

        if (clicked) {
            console.log('[Task 2] SMM-Hub form submitted successfully!');
        } else {
            console.log('[Task 2] Could not find SMM-Hub button.');
        }
    } catch (error) {
        console.error('[Task 2 Error]', error);
    } finally {
        await browser.close();
    }
}

// --- Schedule Timers ---
const LEOFAME_INTERVAL = (24 * 60 + 2) * 60 * 1000;
const SMM_INTERVAL = (4 * 60 + 2) * 60 * 1000;

// Run both immediately on startup
runLeofame();
runSmmHub();

// Set individual loops
setInterval(runLeofame, LEOFAME_INTERVAL);
setInterval(runSmmHub, SMM_INTERVAL);