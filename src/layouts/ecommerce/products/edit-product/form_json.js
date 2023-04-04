const surveyJSON = {
  title: "Test",
  description: "Opis",
  logoPosition: "right",
  completedHtml: "<h3>Twój wynik to {totalScore} z {maxScore} punktów</h3>",
  pages: [
    {
      name: "sekcja1",
      elements: [
        {
          type: "text",
          name: "pytanie1",
          title: "Pytanie1",
        },
      ],
      title: "Strona 1",
      description: "opis",
    },
  ],
};

export default surveyJSON;
