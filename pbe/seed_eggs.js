const pool = require('./db');

async function seed() {
  try {
    console.log('Clearing existing products and categories...');
    await pool.query('DELETE FROM products');
    await pool.query('DELETE FROM categories');

    console.log('Seeding egg products...');
    const products = [
      {
        name: 'D.O.S.E Eggs',
        description: 'Premium quality D.O.S.E eggs, rich in nutrients and carefully selected for the best taste.',
        images: JSON.stringify(['https://images.unsplash.com/photo-1598965402089-897ce52e8355?q=80&w=800&auto=format&fit=crop']),
        image_url: 'https://images.unsplash.com/photo-1598965402089-897ce52e8355?q=80&w=800&auto=format&fit=crop',
        sizes: JSON.stringify([{ size: 'Pack of 6', price: '120' }, { size: 'Pack of 12', price: '220' }, { size: 'Pack of 30', price: '500' }]),
        stock: 500,
        is_active: true,
        is_bestseller: true
      },
      {
        name: 'Vitamin D3 Eggs',
        description: 'Specially enriched Vitamin D3 eggs to boost your immunity and bone health.',
        images: JSON.stringify(['https://images.unsplash.com/photo-1516467508483-a7212febe31a?q=80&w=800&auto=format&fit=crop']),
        image_url: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?q=80&w=800&auto=format&fit=crop',
        sizes: JSON.stringify([{ size: 'Pack of 6', price: '130' }, { size: 'Pack of 12', price: '240' }, { size: 'Pack of 30', price: '550' }]),
        stock: 500,
        is_active: true,
        is_bestseller: false
      },
      {
        name: 'Nutri+ Eggs',
        description: 'Nutri+ Eggs packed with essential vitamins, minerals, and high-quality protein.',
        images: JSON.stringify(['https://images.unsplash.com/photo-1506976785307-8732e854ad03?q=80&w=800&auto=format&fit=crop']),
        image_url: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?q=80&w=800&auto=format&fit=crop',
        sizes: JSON.stringify([{ size: 'Pack of 6', price: '140' }, { size: 'Pack of 12', price: '260' }, { size: 'Pack of 30', price: '600' }]),
        stock: 500,
        is_active: true,
        is_bestseller: true
      },
      {
        name: 'Gold+ Eggs',
        description: 'The finest selection of our premium Gold+ Eggs. Unmatched quality and rich golden yolk.',
        images: JSON.stringify(['https://images.unsplash.com/photo-1627850550198-d7ccf911956e?q=80&w=800&auto=format&fit=crop']),
        image_url: 'https://images.unsplash.com/photo-1627850550198-d7ccf911956e?q=80&w=800&auto=format&fit=crop',
        sizes: JSON.stringify([{ size: 'Pack of 6', price: '150' }, { size: 'Pack of 12', price: '280' }, { size: 'Pack of 30', price: '650' }]),
        stock: 500,
        is_active: true,
        is_bestseller: false
      }
    ];

    for (const p of products) {
      await pool.query(`
        INSERT INTO products (name, description, stock, sizes, images, image_url, is_active, is_bestseller)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `, [p.name, p.description, p.stock, p.sizes, p.images, p.image_url, p.is_active, p.is_bestseller]);
    }

    console.log('✅ Successfully seeded the 4 exclusive egg products!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding products:', error);
    process.exit(1);
  }
}

seed();
