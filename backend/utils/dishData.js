const dishes = [
    {
      name: 'Cheeseburger',
      description: 'Juicy beef patty topped with melted cheese, lettuce, tomato, and pickles.',
      price: 9.99,
      image: 'https://th.bing.com/th/id/OIP.q8rSvHfjv9kNfP7PojeDhgHaGM?pid=ImgDet&rs=1',
    },
    {
      name: 'Margherita Pizza',
      description: 'Classic pizza topped with fresh mozzarella, tomatoes, and basil.',
      price: 12.99,
      image: 'https://i2.wp.com/www.vegrecipesofindia.com/wp-content/uploads/2020/12/margherita-pizza-4.jpg',
    },
    {
      name: 'Chicken Alfredo Pasta',
      description: 'Creamy pasta dish with grilled chicken, Parmesan cheese, and Alfredo sauce.',
      price: 15.99,
      image: 'https://th.bing.com/th/id/OIP.zDv0xXxqrAu38flXExgyIQHaLG?pid=ImgDet&rs=1',
    },
    {
      name: 'Caesar Salad',
      description: 'Crisp romaine lettuce with Parmesan cheese, croutons, and Caesar dressing.',
      price: 8.99,
      image: 'https://th.bing.com/th/id/OIP.ektg-ikZWlSqwRCD2ZJ4qQHaJQ?pid=ImgDet&rs=1',
    },
    {
      name: 'Beef Tacos',
      description: 'Tortillas filled with seasoned ground beef, lettuce, cheese, and salsa.',
      price: 10.99,
      image: 'https://th.bing.com/th/id/OIP.fuYGyXL3nNq4jw1sp_7nMAHaLH?pid=ImgDet&rs=1',
    },
    {
      name: 'Mushroom Risotto',
      description: 'Creamy Arborio rice cooked with mushrooms, white wine, and Parmesan cheese.',
      price: 14.99,
      image: 'https://th.bing.com/th/id/OIP.GXQbLwKeXyV5Y1IQq0pcGAHaHa?pid=ImgDet&rs=1',
    },
    {
      name: 'BBQ Ribs',
      description: 'Tender pork ribs basted with tangy BBQ sauce, served with coleslaw.',
      price: 17.99,
      image: 'https://th.bing.com/th/id/OIP.GoOOnW9e_WfG1xLwDfQvkgHaFR?pid=ImgDet&rs=1',
    },
    {
      name: 'Fish and Chips',
      description: 'Crispy battered fish fillets with seasoned fries and tartar sauce.',
      price: 13.99,
      image: 'https://th.bing.com/th/id/OIP.NT8J3PPtP2_QeSEWoUiKeAHaE8?pid=ImgDet&rs=1',
    },
    {
      name: 'Caprese Salad',
      description: 'Fresh mozzarella, tomatoes, and basil drizzled with balsamic glaze.',
      price: 9.99,
      image: 'https://th.bing.com/th/id/OIP.xQNmnsLyX8T-DC4qb2khhQHaLH?pid=ImgDet&rs=1',
    },
    {
      name: 'Chicken Caesar Wrap',
      description: 'Grilled chicken, romaine lettuce, Parmesan cheese, and Caesar dressing wrapped in a tortilla.',
      price: 11.99,
      image: 'https://th.bing.com/th/id/R.f7a99d27bde9cffff3da36485568434e?rik=NulTp56gmtZe1Q&riu=http%3a%2f%2featup.kitchen%2fwp-content%2fuploads%2f2018%2f07%2fChicken-Tender-Caesar-Wrap_DSCF0641.jpg&ehk=szcMtODdI3Kh74zZ8nGVqQtgpcumaH9Wy7YwUH%2bkcEk%3d&risl=&pid=ImgRaw&r=0',
    },
    {
      name: 'Vegetable Stir-Fry',
      description: 'Assorted vegetables sautéed in a flavorful stir-fry sauce, served with steamed rice.',
      price: 12.99,
      image: 'https://natashaskitchen.com/wp-content/uploads/2020/08/Vegetable-Stir-Fry-2.jpg',
    },
    {
      name: 'Steak Fajitas',
      description: 'Sizzling strips of steak served with grilled peppers, onions, and warm tortillas.',
      price: 16.99,
      image: 'https://th.bing.com/th/id/OIP.zXp8QXMctG53OaUw1NBfKwHaJQ?pid=ImgDet&rs=1',
    },
    {
      name: 'Margherita Panini',
      description: 'Grilled panini sandwich with fresh mozzarella, tomatoes, basil, and pesto.',
      price: 9.99,
      image: 'https://th.bing.com/th/id/OIP.llWZsMqHDNV6auL6vcv0nwHaJc?pid=ImgDet&rs=1',
    },
    {
      name: 'Chicken Noodle Soup',
      description: 'Homemade soup with tender chicken, vegetables, and egg noodles.',
      price: 7.99,
      image: 'https://th.bing.com/th/id/OIP.gT3hIS03Srp-T8_L0rJ8AwHaHa?pid=ImgDet&rs=1',
    },
    {
      name: 'Shrimp Scampi',
      description: 'Sautéed shrimp in a garlic and butter sauce, served with linguine pasta.',
      price: 16.99,
      image: 'https://th.bing.com/th/id/OIP.XIF7iqbnS4rB86qEosD_ugHaHa?pid=ImgDet&rs=1',
    },
    {
      name: 'Spinach and Feta Stuffed Chicken',
      description: 'Grilled chicken breast stuffed with spinach and feta cheese, served with roasted potatoes.',
      price: 14.99,
      image: 'https://th.bing.com/th/id/OIP.An6doE-naMi7DaefZADq0AAAAA?pid=ImgDet&rs=1',
    },
    {
      name: 'Pesto Pasta',
      description: 'Pasta tossed in a flavorful pesto sauce with cherry tomatoes and Parmesan cheese.',
      price: 11.99,
      image: 'https://th.bing.com/th/id/OIP.a9aD2eUFbykkAWjKUxbF4QHaLJ?pid=ImgDet&rs=1',
    },
    {
      name: 'Hawaiian Pizza',
      description: 'Pizza topped with ham, pineapple, mozzarella cheese, and tomato sauce.',
      price: 13.99,
      image: 'https://i1.wp.com/deusexmagicalgirl.com/wp-content/uploads/2016/06/maxresdefault.jpg?fit=2592%2C1936&ssl=1',
    },
    {
      name: 'Beef Burrito',
      description: 'Flour tortilla filled with seasoned beef, rice, beans, cheese, and salsa.',
      price: 10.99,
      image: 'https://th.bing.com/th/id/OIP.i4SPNrBm9v7NhAYRXOC_VwHaHa?pid=ImgDet&rs=1',
    },
    {
      name: 'Chocolate Brownie Sundae',
      description: 'Warm chocolate brownie topped with vanilla ice cream, whipped cream, and chocolate sauce.',
      price: 6.99,
      image: 'https://th.bing.com/th/id/OIP.3FM0dFTqp18XeZOCCHBNJwHaJ4?pid=ImgDet&rs=1',
    },
  ];
  

  module.exports={
    dishes
  }