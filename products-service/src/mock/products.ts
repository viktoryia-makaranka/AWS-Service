import { collections } from './collections'
import { categories } from './categories'
import { groups } from './groups'
import { types } from './types'

export const products = [
  {
    id: '1',
    title: 'A fun graphic tee featuring everyone\'s favorite clown fish',
    description: 'Get your young star ready for adventure with this kids\' Disney Pixar\'s Finding Nemo graphic tee. Adorned in the adidas 3-Stripes graphic, your little one will be sure to meet whatever the day brings in style. The ultra-soft cotton fabric will keep their movements comfy and unrestricted.',
    price: 40,
    category: categories.apparel,
    type: types.tee,
    collection: collections.disney,
    group: groups.kids
  }, {
    id: '2',
    title: 'Grippy shoes for lego® fans, made in part with recycled materials',
    description: 'Imagine being able to wear your favorite toy on your feet. Now your LEGO® fan can do so with these kids\' shoes, part of the adidas and Lego Group collection. The sport-inspired design keeps up with kids\' high energy levels. The rubber outsole ensures grip, and the Torsion System provides stability through every jump and sprint. The mesh upper lets feet breathe and stay cool no matter what the day has in store.',
    price: 80,
    category: categories.footwear,
    type: types.shoes,
    collection: collections.running,
    group: groups.kids
  }, {
    id: '3',
    title: 'Youth originals trefoil chain snapback',
    description: 'Keep it classic in this snapback cap featuring a chain-stitched dimensional logo. Six-panel silhouette with a flat brim, stitched eyelets on the crown and an adjustable snapback strap and embroidered logo at the back.',
    price: 20,
    category: categories.hardware,
    type: types.cap,
    collection: collections.originals,
    group: groups.kids
  }, {
    id: '4',
    title: 'Adicolor classics tight summer dress',
    description: 'Birds chirping. Sun shining. There\'s no reason to stay inside when you can go show off this adidas dress. Its slim and stretchy build celebrates your every curve, with cotton that feels deliciously soft against your skin. While the 3-Stripes couldn\'t be more authentic, the open back adds a modern edge.',
    price: 45,
    category: categories.apparel,
    type: types.dress,
    collection: collections.originals,
    group: groups.women
  }, {
    id: '5',
    title: 'Nizza Bonega Mid Shoes',
    description: 'Add an element of the wild into your wardrobe rotation. These adidas Nizza Bonega Mid Shoes will turn heads when you step out. The textile upper is covered in an allover animal print while golden branding details add a touch of shine. A double platform outsole provides extra height, and the memory foam sockliner keeps each step plush.',
    price: 100,
    category: categories.footwear,
    type: types.shoes,
    collection: collections.originals,
    group: groups.women
  }, {
    id: '6',
    title: 'Relaxed strap-back hat',
    description: 'This women\'s hat has low-key Trefoil style with an embroidered logo on the front. Made of washed canvas, the hat has a crushable, packable design and an adjustable back strap so you can personalize the fit.',
    price: 25,
    category: categories.hardware,
    type: types.cap,
    collection: collections.originals,
    group: groups.women
  }, {
    id: '7',
    title: 'Aeroready designed to move feelready sport tee',
    description: 'From morning workout routines to afternoon track runs, this adidas t-shirt keeps you moving in comfort. Moisture-managing AEROREADY ensures you stay dry when you\'re on the go. The FreeLift design gives you full a range of motion and a stay-put fit during overhead movements. A longer back hem adds extra coverage.',
    price: 15,
    category: categories.apparel,
    type: types.tee,
    collection: collections.originals,
    group: groups.men
  }, {
    id: '8',
    title: 'Ultraboost light shoes',
    description: 'Go bold and bright with the Ultraboost Light red colorway, exclusive to adidas stores. Experience epic energy with the new Ultraboost Light, our lightest Ultraboost ever. The magic lies in the Light BOOST midsole, a new generation of adidas BOOST. Its unique molecule design achieves the lightest BOOST foam to date and boasts a 10% lower carbon footprint than previous models (for more information see FAQs below). With ultimate cushioning, comfort and responsiveness, some feet really can have it all.',
    price: 190,
    category: categories.footwear,
    type: types.shoes,
    collection: collections.running,
    group: groups.men
  }, {
    id: '9',
    title: 'New prep trucker hat',
    description: 'Keep the vintage vibes alive with the adidas New Prep Trucker Hat. The style is a staple in modern fashion, and this version pairs mesh back paneling with retro adidas graphics. A pre-curved foam brim keeps the sun away from their eyes, and a snapback closure keeps the fit snug.',
    price: 25,
    category: categories.hardware,
    type: types.cap,
    collection: collections.originals,
    group: groups.men
  }
]
