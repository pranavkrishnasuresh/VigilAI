const getAllReports = async (req, res) => {
    try {
      const criminalActivities = [
        {
          "name": "Burglary",
          "date": "2023-10-15",
          "number": 27
        },
        {
          "name": "Assault",
          "date": "2023-09-28",
          "number": 14
        },
        {
          "name": "Robbery",
          "date": "2023-08-20",
          "number": 35
        },
        {
          "name": "Fraud",
          "date": "2023-07-12",
          "number": 8
        },
        {
          "name": "Drug Trafficking",
          "date": "2023-06-05",
          "number": 42
        },
        {
          "name": "Vandalism",
          "date": "2023-05-18",
          "number": 19
        },
        {
          "name": "Kidnapping",
          "date": "2023-04-22",
          "number": 31
        },
        {
          "name": "Arson",
          "date": "2023-03-10",
          "number": 5
        },
        {
          "name": "Homicide",
          "date": "2023-02-04",
          "number": 48
        },
        {
          "name": "Extortion",
          "date": "2023-01-19",
          "number": 23
        }
      ];
  
      res.status(200).json(criminalActivities);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  module.exports = getAllReports;
  