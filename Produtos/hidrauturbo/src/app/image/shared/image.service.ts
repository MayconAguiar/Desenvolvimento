import { Injectable } from '@angular/core';

@Injectable()
export class ImageService {

    visibleImages = [];

    getImages() {
        return this.visibleImages = IMAGES.slice(0);
    }

    getImage(id: number) {
        return IMAGES.slice(0).find(image => image.id == id);
    }

}

const IMAGES = [
    
    {"id": 1, "category": "animals", "caption": "Giraffe", "url": "assets/img/galeria/a1.jpg"},
    {"id": 2, "category": "animals", "caption": "Lion", "url": "assets/img/galeria/a2.jpg"}
    // {"id": 3, "category": "animals", "caption": "Animal", "url": "assets/img/galeria/a3.jpg"},
    // {"id": 4, "category": "animals", "caption": "Kittens", "url": "assets/img/galeria/a4.jpg"},
    // {"id": 5, "category": "animals", "caption": "Zebra", "url": "assets/img/galeria/a5.jpg"},
    // {"id": 6, "category": "animals", "caption": "Zebra", "url": "assets/img/galeria/a6.jpg"},
    // {"id": 7, "category": "animals", "caption": "Zebra", "url": "assets/img/galeria/a7.jpg"},
    // {"id": 8, "category": "animals", "caption": "Zebra", "url": "assets/img/galeria/a8.jpg"},
    // {"id": 9, "category": "animals", "caption": "Zebra", "url": "assets/img/galeria/a9.jpg"},
    
]