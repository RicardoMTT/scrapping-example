import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async scrapeWebsite(url: string): Promise<any> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // método $$eval para obtener todos los elementos que contengan la clase catalog-product-item y 
    // despues obtener el link,price y name
    const data = await page.$$eval('.catalog-product-item', (items) =>
    items.map((item) => {
      const link = item.querySelector('.catalog-product-item')?.getAttribute('href');
      const price = item.querySelector('.catalog-prices__offer-price')?.textContent;
      const name = item.querySelector('.catalog-product-details__name')?.textContent;
      if (!link) {
        return;
      }
      return {
        link: link || '',
        price: price || '',
        name:name||''
      };
    })
  );
    await browser.close();
    // Puedes devolver los datos extraídos o realizar otras operaciones con ellos
    return data;
  }


  async scrapeWebsiteSaga(url: string): Promise<any> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // método $$eval para obtener todos los elementos que contengan la clase catalog-product-item y 
    // despues obtener el link,price y name
    const data = await page.$$eval('.jsx-200723616', (items) =>
    items.map((item) => {
      const link = item.querySelector('.pod-link')?.getAttribute('href');
      const price = item.querySelector('span.copy10')?.textContent;
      const name = item.querySelector('.pod-subTitle')?.textContent;
      const discount = item.querySelector('.discount-badge');
      if (!link) {
        return;
      }
      return {
        link: link || '',
        price: price || '',
        name:name||'',
        discount: discount?true:false
      };
    })
  );
    await browser.close();
    // Puedes devolver los datos extraídos o realizar otras operaciones con ellos
    return data;
  }
}
