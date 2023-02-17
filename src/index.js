import * as entities from "entities";

const questionButton = document.querySelector('[data-js="btn-question"]');
const answerButton = document.querySelector('[data-js="btn-answer"]');
const questionElement = document.querySelector('[data-js="question"]');
const answerElement = document.querySelector('[data-js="answer"]');

const initialButtonText = questionButton.textContent;
const triviaUrl = "https://opentdb.com/api.php?amount=1";

async function getQuestion() {
  try {
    questionButton.textContent = "Loading...";
    questionButton.disabled = true;
    const fetchJson = await fetch(triviaUrl);
    if (fetchJson.ok) {
      const fetchJs = await fetchJson.json();
      const {
        question,
        correct_answer: answer,
        category: tag,
      } = fetchJs.results[0];
      return { question, answer, tag };
    }
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    questionButton.textContent = initialButtonText;
    questionButton.disabled = false;
  }
}

questionButton.addEventListener("click", async () => {
  try {
    const question = await getQuestion();
    displayQuestion(question);
  } catch (err) {
    alert("Das hat nicht geklappt...");
    console.log(err);
  }
});

function displayQuestion({ question, answer }) {
  questionElement.textContent = entities.decodeHTML(question);
  answerElement.classList.add("hidden");
  answerElement.textContent = entities.decodeHTML(answer);
  answerButton.classList.remove("hidden");
}

answerButton.addEventListener("click", () => {
  answerButton.classList.add("hidden");
  answerElement.classList.remove("hidden");
});
