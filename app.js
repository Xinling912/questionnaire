const END_TRIGGERS = new Set([
  "A4_no_never",
  "A5_none",
  "A7_never",
  "A8_never",
  "A9_never",
]);

const screens = [
  {
    id: "welcome",
    type: "welcome",
    title: "AI Programming Learning Questionnaire",
    titleCn: "AI 编程学习问卷",
    body:
      "Please complete each page before continuing. Once you continue, you cannot return to previous pages.",
    bodyCn: "请完成当前页面后继续。进入下一页后不可返回上一页。",
  },
  {
    id: "A1",
    type: "choice",
    section: "Demographic Information / 人口统计信息",
    en: "A1. Your gender",
    cn: "你的性别：",
    required: true,
    multiple: false,
    options: [
      ["male", "Male", "男性"],
      ["female", "Female", "女性"],
      ["non_binary", "Non-binary", "非二元性别"],
      ["prefer_not", "Prefer not to tell", "不愿透露"],
    ],
  },
  {
    id: "A2",
    type: "choice",
    en: "A2. Your age range",
    cn: "你的年龄段：",
    required: true,
    multiple: false,
    options: [
      ["18_24", "18-24", ""],
      ["25_34", "25-34", ""],
      ["35_44", "35-44", ""],
      ["45_54", "45-54", ""],
      ["55_64", "55-64", ""],
      ["65_plus", "65 or above", "65岁及以上"],
    ],
  },
  {
    id: "A3",
    type: "choice",
    section: "Background Information / 背景信息",
    en: "A3. Your major category",
    cn: "你的专业类别：",
    required: true,
    multiple: false,
    options: [
      ["stem", "STEM Science / Technology / Engineering / Mathematics", "理工科"],
      ["humanities", "Humanities / Social Sciences", "人文社科"],
      ["business", "Business / Management", "商科/管理"],
      ["other", "Other", "其他", true],
    ],
  },
  {
    id: "A4",
    type: "choice",
    en: "A4. Have you taken or are you currently taking any programming-related courses?",
    cn: "你是否正在修读或曾经修读过编程相关课程？",
    required: true,
    multiple: false,
    options: [
      ["current", "Yes, currently taking", "是，正在修读"],
      ["completed", "Yes, completed", "是，已完成修读"],
      ["A4_no_never", "No, never taken", "否，从未修读过"],
    ],
  },
  {
    id: "A5",
    type: "choice",
    en: "A5. Which programming languages do you know? (Select all that apply)",
    cn: "你了解或使用过哪些编程语言？（可多选）",
    required: true,
    multiple: true,
    exclusiveValues: ["A5_none"],
    options: [
      ["python", "Python", ""],
      ["java", "Java", ""],
      ["c", "C", ""],
      ["cpp", "C++", ""],
      ["csharp", "C#", ""],
      ["js_ts", "JavaScript / TypeScript", ""],
      ["html", "HTML", ""],
      ["css", "CSS", ""],
      ["A5_none", "None", "无"],
      ["other", "Other", "其他", true],
    ],
  },
  {
    id: "A6",
    type: "choice",
    en: "A6. What is your current year of study?",
    cn: "你目前的年级是？",
    required: true,
    multiple: false,
    options: [
      ["undergraduate", "Undergraduate", "本科生"],
      ["graduate", "Graduate", "硕士研究生"],
      ["postgraduate", "Postgraduate", "博士研究生"],
      ["other", "Other", "其他", true],
    ],
  },
  {
    id: "A7",
    type: "choice",
    en: "A7. Which AI tools have you used for programming? (Select all that apply)",
    cn: "你使用过哪些 AI 工具辅助编程？（可多选）",
    required: true,
    multiple: true,
    exclusiveValues: ["A7_never"],
    options: [
      [
        "general_assistant",
        "General-purpose conversational assistant (e.g., AI tools, Gemini, Doubao, DeepSeek, Qwen, ERNIE Bot)",
        "通用对话式 AI 助手",
      ],
      [
        "coding_agent",
        "AI coding agent (e.g., Codex, Copilot, Claude Code, Cursor)",
        "AI 编程智能体",
      ],
      ["A7_never", "Never Used", "未使用过"],
      ["other", "Other", "其他", true],
    ],
  },
  {
    id: "A8",
    type: "choice",
    en: "A8. How long have you been using AI tools for programming?",
    cn: "你使用 AI 工具辅助编程有多长时间了？",
    required: true,
    multiple: false,
    options: [
      ["A8_never", "Never used", "从未使用"],
      ["lt_1_month", "Less than 1 month", "不到 1 个月"],
      ["1_3_months", "1-3 months", "1-3 个月"],
      ["3_6_months", "3-6 months", "3-6 个月"],
      ["6_12_months", "6-12 months", "6-12 个月"],
      ["gt_1_year", "More than 1 year", "超过 1 年"],
    ],
  },
  {
    id: "A9",
    type: "choice",
    en: "A9. How frequently do you use AI tools for programming?",
    cn: "你多久使用一次 AI 工具进行编程？",
    required: true,
    multiple: false,
    options: [
      ["daily", "Every day", "每天"],
      ["2_6_week", "2-6 times per week", "每周 2-6 次"],
      ["weekly", "Once a week", "每周 1 次"],
      ["2_3_month", "2-3 times per month", "每月 2-3 次"],
      ["monthly", "Once a month", "每月 1 次"],
      ["less_monthly", "Less than once a month", "少于每月 1 次"],
      ["A9_never", "Never Used", "从未使用"],
    ],
  },
  {
    id: "B",
    type: "likert",
    title: "Instructions: Please answer based on your actual experience with programming assignments.",
    titleCn: "说明：请根据你在编程作业中的真实经历回答。",
    leftLabel: "Strongly Disagree / 非常不同意",
    rightLabel: "Strongly Agree / 非常同意",
    items: [
      ["B1", "When programming, even for tasks I can easily complete on my own, I still unconsciously turn to generative AI tools to generate code.", "即使是在我自己能轻松完成的编程任务上，我仍然会不自觉地转向生成式 AI 工具来生成代码。"],
      ["B2", "When encountering programming problems, I first turn to generative AI rather than attempting to think independently or consult documentation.", "当遇到编程问题时，我的第一反应是求助于生成式 AI，而不是尝试独立思考或查阅文档。"],
      ["B3", "When the suggestions provided by one generative AI tool fail to resolve a programming problem immediately, I switch to another generative AI tool to continue programming.", "当一个生成式 AI 工具的建议未能立即解决编程问题时，我会切换到另一个生成式 AI 工具继续编程。"],
      ["B4", "When code generated by a generative AI tool contains errors, I am more inclined to rely on another generative AI tool for debugging rather than analyzing the code line by line myself.", "当 AI 生成的代码包含错误时，我更倾向于依赖另一个生成式 AI 工具来调试，而不是自己逐行分析代码。"],
      ["B5", "My use of generative AI has caused concerns for me.", "我对生成式 AI 的使用已经引起了我的担忧。"],
      ["B6", "I have trouble completing work or other responsibilities without generative AI.", "没有生成式 AI，我难以完成工作或其他任务。"],
      ["B7", "I feel less confident in my abilities without generative AI.", "没有生成式 AI，我对自己的能力感到不那么自信。"],
      ["B8", "My use of generative AI has negatively affected my problem-solving skills or efficiency.", "我对生成式 AI 的使用已经对我的问题解决能力或效率产生了负面影响。"],
    ],
  },
  {
    id: "Q3_1",
    type: "likert",
    title: "Q3.1 Perceived Usefulness for Programming Learning",
    titleCn: "编程学习有用性感知",
    leftLabel: "Strongly Disagree / 非常不同意",
    rightLabel: "Strongly Agree / 非常同意",
    explain: ["Please explain the reasons for your ratings above:", "请解释你上述评分的理由："],
    items: [
      ["Q3.1.1", "AI tools help me to learn programming more efficiently.", "AI tools 帮助我更高效地学习编程。"],
      ["Q3.1.2", "AI tools improve my programming performance.", "AI tools 提高了我的编程表现。"],
      ["Q3.1.3", "AI tools make my learning more effective.", "AI tools 让我的学习更有效。"],
      ["Q3.1.4", "AI tools make it easier to learn programming.", "AI tools 让学习编程变得更容易。"],
      ["Q3.1.5", "Overall, AI tools are advantageous for my programming learning.", "总体而言，AI tools 对我的编程学习是有益的。"],
    ],
  },
  {
    id: "Q3_2",
    type: "likert",
    title: "Q3.2 Perceived Cost / Responsible AI Risk",
    titleCn: "感知成本与负责任 AI 风险",
    leftLabel: "Strongly Disagree / 非常不同意",
    rightLabel: "Strongly Agree / 非常同意",
    explain: ["Please explain the reasons for your ratings above:", "请解释你上述评分的理由："],
    items: [
      ["Q3.2.1", "Using generative AI technologies such as AI tools to complete assignments undermines the value of a university education.", "使用 AI tools 等生成式 AI 技术完成作业会削弱大学教育的价值。"],
      ["Q3.2.2", "Generative AI technologies such as AI tools will limit my opportunities to interact with others and socialize while completing coursework.", "在完成课程任务时，AI tools 等生成式 AI 技术会限制我与他人互动和社交的机会。"],
      ["Q3.2.3", "Generative AI technologies such as AI tools will hinder my development of generic or transferable skills such as teamwork, problem-solving, and leadership skills.", "AI tools 等生成式 AI 技术会阻碍我发展团队合作、问题解决和领导力等通用或可迁移技能。"],
      ["Q3.2.4", "I can become over-reliant on generative AI technologies.", "我可能会过度依赖生成式 AI 技术。"],
    ],
  },
  {
    id: "Q3_3",
    type: "likert",
    title: "Q3.3 Programming Learning Acceptance",
    titleCn: "编程学习接受度",
    leftLabel: "Strongly Disagree / 非常不同意",
    rightLabel: "Strongly Agree / 非常同意",
    explain: ["Please explain the reasons for your ratings above:", "请解释你上述评分的理由："],
    items: [
      ["Q3.3.1", "Are AI tools helpful for learning programming?", "AI tools 对学习编程有帮助吗？"],
      ["Q3.3.2", "Will you keep using AI tools for learning programming?", "你会继续使用 AI tools 学习编程吗？"],
      ["Q3.3.3", "Will you use AI tools often?", "你会经常使用 AI tools 吗？"],
      ["Q3.3.4", "Will you recommend AI tools to friends?", "你会向朋友推荐 AI tools 吗？"],
    ],
  },
  {
    id: "Q3_4",
    type: "likert",
    title: "Q3.4 How and to what extent do you think AI tools can help with your programming learning?",
    titleCn: "你认为 AI 工具在多大程度上能帮助你学习编程？",
    leftLabel: "Not useful at all",
    rightLabel: "Extremely useful",
    explain: [
      "Please explain the reasons for your ratings above (e.g., why you rated a particular function as highly useful or not useful):",
      "请解释你上述评分的理由（例如，为什么你认为某个功能特别有用或没有用）：",
    ],
    items: [
      ["correct_code", "Correct programming code", "纠正编程代码"],
      ["answer_questions", "Answer programming questions", "回答编程问题"],
      ["provide_examples", "Provide examples of programming code", "提供编程代码示例"],
      ["learning_advice", "Offer learning advice and resources", "提供学习建议和资源"],
      ["explain_concepts", "Explain programming concepts", "解释编程概念"],
    ],
  },
  {
    id: "Q3_5",
    type: "text",
    title: "Q3.5 Open-Ended Questions",
    titleCn: "开放题",
    en: "How could AI tools be improved to better assist with programming learning?",
    cn: "AI tools 应如何改进，才能更好地辅助编程学习？",
    required: true,
  },
  {
    id: "submit",
    type: "submit",
  },
];

const state = {
  index: 0,
  answers: {},
  endedEarly: false,
  endReason: "",
};

const screenEl = document.querySelector("#screen");
const nextButton = document.querySelector("#nextButton");
const validationMessage = document.querySelector("#validationMessage");
const stepLabel = document.querySelector("#stepLabel");
const progressLabel = document.querySelector("#progressLabel");

nextButton.addEventListener("click", handleNext);

function render() {
  const current = screens[state.index];
  stepLabel.textContent = current.section || current.id || "Questionnaire";
  progressLabel.textContent = `${Math.min(state.index + 1, screens.length)}/${screens.length}`;
  validationMessage.textContent = "";
  nextButton.disabled = !isComplete(current);
  nextButton.textContent = current.type === "submit" ? "Download JSON" : "Continue";

  if (current.type === "welcome") renderWelcome(current);
  if (current.type === "choice") renderChoice(current);
  if (current.type === "likert") renderLikert(current);
  if (current.type === "text") renderText(current);
  if (current.type === "submit") renderSubmit(current);
}

function renderWelcome(screen) {
  screenEl.innerHTML = `
    <p class="kicker">Draft Questionnaire</p>
    <h1>${screen.title}<span class="cn-title">${screen.titleCn}</span></h1>
    <p class="intro">${screen.body}<br>${screen.bodyCn}</p>
  `;
}

function renderChoice(screen) {
  const inputType = screen.multiple ? "checkbox" : "radio";
  const selected = getAnswer(screen.id)?.value || [];
  screenEl.innerHTML = `
    ${screen.section ? `<p class="kicker">${screen.section}</p>` : ""}
    <div class="question-title">
      <span class="en">${screen.en}</span>
      <span class="cn">${screen.cn}</span>
    </div>
    <div class="options">
      ${screen.options
        .map(([value, en, cn, hasOther]) => {
          const checked = selected.includes(value) ? "checked" : "";
          const otherValue = getAnswer(screen.id)?.other?.[value] || "";
          return `
            <label class="option">
              <input type="${inputType}" name="${screen.id}" value="${value}" ${checked}>
              <span class="option-text">
                <span class="en">${en}</span>
                ${cn ? `<span class="cn">${cn}</span>` : ""}
                ${hasOther ? `<span class="other-field"><input data-other="${value}" type="text" value="${escapeAttr(otherValue)}" placeholder="Please specify / 请说明"></span>` : ""}
              </span>
            </label>
          `;
        })
        .join("")}
    </div>
  `;

  screenEl.querySelectorAll(`input[name="${screen.id}"]`).forEach((input) => {
    input.addEventListener("change", () => updateChoice(screen));
  });
  screenEl.querySelectorAll("[data-other]").forEach((input) => {
    input.addEventListener("input", () => {
      const otherOption = screenEl.querySelector(
        `input[name="${screen.id}"][value="${input.dataset.other}"]`
      );
      if (input.value.trim() && otherOption) {
        otherOption.checked = true;
      }
      updateChoice(screen);
    });
  });
}

function updateChoice(screen) {
  let selected = [...screenEl.querySelectorAll(`input[name="${screen.id}"]:checked`)].map(
    (input) => input.value
  );

  if (screen.multiple && screen.exclusiveValues) {
    const latest = document.activeElement?.value;
    if (screen.exclusiveValues.includes(latest)) {
      selected = [latest];
    } else {
      selected = selected.filter((value) => !screen.exclusiveValues.includes(value));
    }
    screenEl.querySelectorAll(`input[name="${screen.id}"]`).forEach((input) => {
      input.checked = selected.includes(input.value);
    });
  }

  const other = {};
  screenEl.querySelectorAll("[data-other]").forEach((input) => {
    if (selected.includes(input.dataset.other)) other[input.dataset.other] = input.value.trim();
  });

  state.answers[screen.id] = { value: selected, other };
  nextButton.disabled = !isComplete(screen);
}

function renderLikert(screen) {
  const answer = getAnswer(screen.id) || { values: {}, explanation: "" };
  screenEl.innerHTML = `
    <div class="question-title">
      <span class="en">${screen.title}</span>
      <span class="cn">${screen.titleCn}</span>
    </div>
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th class="item-code">Item<br>题号</th>
            <th>Question<br>问题</th>
            <th>Response<br>作答</th>
          </tr>
        </thead>
        <tbody>
          ${screen.items
            .map(
              ([code, en, cn]) => `
                <tr>
                  <td class="item-code">${code}</td>
                  <td class="prompt"><span class="en">${en}</span><span class="cn">${cn}</span></td>
                  <td class="scale" data-code="${code}">
                    <div class="scale-labels"><span>${screen.leftLabel}</span><span>${screen.rightLabel}</span></div>
                    <div class="scale-buttons">
                      ${[1, 2, 3, 4, 5]
                        .map(
                          (score) =>
                            `<button type="button" data-score="${score}" class="${answer.values[code] === score ? "selected" : ""}">${score}</button>`
                        )
                        .join("")}
                    </div>
                  </td>
                </tr>
              `
            )
            .join("")}
        </tbody>
      </table>
    </div>
    ${
      screen.explain
        ? `<div class="explain-box">
            <label>${screen.explain[0]}<span class="cn">${screen.explain[1]}</span></label>
            <textarea id="explanation" placeholder="Type your explanation here / 请在此输入解释">${answer.explanation || ""}</textarea>
          </div>`
        : ""
    }
  `;

  screenEl.querySelectorAll(".scale button").forEach((button) => {
    button.addEventListener("click", () => {
      const code = button.closest(".scale").dataset.code;
      if (!state.answers[screen.id]) state.answers[screen.id] = { values: {}, explanation: "" };
      state.answers[screen.id].values[code] = Number(button.dataset.score);
      button.parentElement.querySelectorAll("button").forEach((sibling) => sibling.classList.remove("selected"));
      button.classList.add("selected");
      nextButton.disabled = !isComplete(screen);
    });
  });

  const explanation = screenEl.querySelector("#explanation");
  if (explanation) {
    explanation.addEventListener("input", () => {
      if (!state.answers[screen.id]) state.answers[screen.id] = { values: {}, explanation: "" };
      state.answers[screen.id].explanation = explanation.value.trim();
      nextButton.disabled = !isComplete(screen);
    });
  }
}

function renderText(screen) {
  const answer = getAnswer(screen.id)?.value || "";
  screenEl.innerHTML = `
    <div class="question-title">
      <span class="en">${screen.title}</span>
      <span class="cn">${screen.titleCn}</span>
    </div>
    <div class="explain-box">
      <label>${screen.en}<span class="cn">${screen.cn}</span></label>
      <textarea id="textAnswer" placeholder="Type your answer here / 请在此输入答案">${answer}</textarea>
    </div>
  `;
  screenEl.querySelector("#textAnswer").addEventListener("input", (event) => {
    state.answers[screen.id] = { value: event.target.value.trim() };
    nextButton.disabled = !isComplete(screen);
  });
}

function renderSubmit() {
  const early = state.endedEarly
    ? `<p><strong>Questionnaire ended early.</strong><br>结束原因：${state.endReason}</p>`
    : "<p><strong>All pages are complete.</strong><br>所有页面均已完成。</p>";

  screenEl.innerHTML = `
    <p class="kicker">Submission</p>
    <h2>Thank you<span class="cn-title">感谢你的填写</span></h2>
    <div class="status">
      ${early}
      <p>This prototype stores answers in the browser and can download a JSON file. When the backend is selected, the same data object can be sent to an API.</p>
      <p>当前原型会把答案暂存在浏览器中，并可下载 JSON 文件。后续确定后端后，同一份数据可以提交到 API。</p>
    </div>
  `;
  nextButton.disabled = false;
}

function handleNext() {
  const current = screens[state.index];

  if (!isComplete(current)) {
    validationMessage.textContent = "Please complete this page before continuing. / 请先完成当前页面。";
    return;
  }

  if (current.type === "submit") {
    downloadResponses();
    return;
  }

  const trigger = getEndTrigger(current);
  if (trigger) {
    state.endedEarly = true;
    state.endReason = trigger;
    state.index = screens.findIndex((screen) => screen.id === "submit");
    render();
    return;
  }

  state.index += 1;
  render();
}

function getAnswer(id) {
  return state.answers[id];
}

function isComplete(screen) {
  if (screen.type === "welcome" || screen.type === "submit") return true;
  const answer = getAnswer(screen.id);
  if (screen.type === "choice") {
    if (!answer || answer.value.length === 0) return false;
    const selectedOther = screen.options.filter((option) => option[3]).map((option) => option[0]);
    return selectedOther.every((value) => !answer.value.includes(value) || Boolean(answer.other?.[value]));
  }
  if (screen.type === "likert") {
    if (!answer) return false;
    const allRated = screen.items.every(([code]) => Number.isInteger(answer.values?.[code]));
    const explanationReady = !screen.explain || Boolean(answer.explanation?.trim());
    return allRated && explanationReady;
  }
  if (screen.type === "text") return Boolean(answer?.value?.trim());
  return false;
}

function getEndTrigger(screen) {
  if (screen.type !== "choice") return "";
  const selected = getAnswer(screen.id)?.value || [];
  return selected.find((value) => END_TRIGGERS.has(value)) || "";
}

function downloadResponses() {
  const payload = {
    submittedAt: new Date().toISOString(),
    endedEarly: state.endedEarly,
    endReason: state.endReason,
    answers: state.answers,
  };
  localStorage.setItem("questionnaireResponses", JSON.stringify(payload));
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `questionnaire-${Date.now()}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function escapeAttr(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

render();
