app.get('/', async (req, res) => {
    try {
      const assignments = await Assignment.find(); // Fetch assignments from DB
      console.log('Fetched assignments:', assignments); // Log fetched assignments
      res.render('index', { assignments }); // Render EJS with assignments
    } catch (err) {
      console.error('Error fetching assignments:', err);
      res.send('Error fetching assignments');
    }
  });
  