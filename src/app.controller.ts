import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test')
  async scrape(): Promise<any> {
    //ripley
    const url = 'https://simple.ripley.com.pe/tecnologia/promociones/de-33-a-43-pulgadas?s=mdco'; // URL de la página web que deseas hacer web scraping
    const data = await this.appService.scrapeWebsite(url);

    const url2 = 'https://tienda.falabella.com.pe/falabella-pe/search?Ntt=televisor'; // URL de la página web que deseas hacer web scraping
    const data2 = await this.appService.scrapeWebsiteSaga(url2);



    const newData = data.filter(item => item !== null)
    const newData2 = data2.filter(item => item !== null)
    console.log(newData.length);

    return newData2;
  }
}
