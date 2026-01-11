// Основной файл JavaScript для тренажёра физических формул

class PhysicsTrainer {
    constructor() {
        console.log('PhysicsTrainer конструктор вызван');
        
        // Сначала загружаем формулы и историю
        const formulas = this.loadFormulas();
        const history = JSON.parse(localStorage.getItem('physicsTrainerHistory')) || [];
        
        // Затем инициализируем состояние
        this.state = {
            user: localStorage.getItem('physicsTrainerUser') || 'Гость',
            formulas: formulas,
            test: {
                currentQuestion: 0,
                score: 0,
                skipped: 0,
                incorrect: 0,
                answers: [],
                questions: [],
                started: false
            },
            history: history
        };

        // Инициализация приложения
        this.init();
    }

    // Инициализация приложения
    init() {
        console.log('Инициализация приложения...');
        this.cacheDOM();
        this.bindEvents();
        this.showMainMenu();
        this.updateUserDisplay();
        this.updateStatistics();
        
        // Показываем приветственное сообщение
        setTimeout(() => {
            this.showToast('Добро пожаловать в тренажёр физических формул!', 'success');
        }, 500);
        
        console.log('Инициализация завершена');
    }

    // Кэширование DOM элементов
    cacheDOM() {
        console.log('Кэширование DOM элементов...');
        
        // Проверка существования всех элементов
        const checkElement = (id, element) => {
            if (!element) {
                console.error(`Элемент с id "${id}" не найден!`);
            }
            return element;
        };

        // Основные секции
        this.mainMenu = checkElement('mainMenu', document.getElementById('mainMenu'));
        this.testSection = checkElement('testSection', document.getElementById('testSection'));
        this.addFormulaSection = checkElement('addFormulaSection', document.getElementById('addFormulaSection'));
        this.viewFormulasSection = checkElement('viewFormulasSection', document.getElementById('viewFormulasSection'));
        this.statisticsSection = checkElement('statisticsSection', document.getElementById('statisticsSection'));

        // Элементы пользователя
        this.userNameDisplay = checkElement('userNameDisplay', document.getElementById('userNameDisplay'));
        this.changeUserBtn = checkElement('changeUserBtn', document.getElementById('changeUserBtn'));
        this.quickNameModal = checkElement('quickNameModal', document.getElementById('quickNameModal'));
        this.quickNameInput = checkElement('quickNameInput', document.getElementById('quickNameInput'));
        this.saveQuickNameBtn = checkElement('saveQuickNameBtn', document.getElementById('saveQuickNameBtn'));
        this.cancelQuickNameBtn = checkElement('cancelQuickNameBtn', document.getElementById('cancelQuickNameBtn'));

        // Элементы тестирования
        this.formulaName = checkElement('formulaName', document.getElementById('formulaName'));
        this.formulaInput = checkElement('formulaInput', document.getElementById('formulaInput'));
        this.checkAnswerBtn = checkElement('checkAnswerBtn', document.getElementById('checkAnswerBtn'));
        this.nextQuestionBtn = checkElement('nextQuestionBtn', document.getElementById('nextQuestionBtn'));
        this.skipQuestionBtn = checkElement('skipQuestionBtn', document.getElementById('skipQuestionBtn'));
        this.resultContainer = checkElement('resultContainer', document.getElementById('resultContainer'));
        this.resultMessage = checkElement('resultMessage', document.getElementById('resultMessage'));
        this.correctAnswerContainer = checkElement('correctAnswerContainer', document.getElementById('correctAnswerContainer'));
        this.correctAnswer = checkElement('correctAnswer', document.getElementById('correctAnswer'));
        this.progressFill = checkElement('progressFill', document.getElementById('progressFill'));
        this.currentQuestion = checkElement('currentQuestion', document.getElementById('currentQuestion'));
        this.totalQuestions = checkElement('totalQuestions', document.getElementById('totalQuestions'));

        // Результаты теста
        this.scoreBoard = checkElement('scoreBoard', document.getElementById('scoreBoard'));
        this.correctCount = checkElement('correctCount', document.getElementById('correctCount'));
        this.incorrectCount = checkElement('incorrectCount', document.getElementById('incorrectCount'));
        this.skippedCount = checkElement('skippedCount', document.getElementById('skippedCount'));
        this.totalCount = checkElement('totalCount', document.getElementById('totalCount'));
        this.percentage = checkElement('percentage', document.getElementById('percentage'));
        this.grade = checkElement('grade', document.getElementById('grade'));

        // Кнопки навигации
        this.startTestBtn = checkElement('startTestBtn', document.getElementById('startTestBtn'));
        this.addFormulaBtn = checkElement('addFormulaBtn', document.getElementById('addFormulaBtn'));
        this.viewFormulasBtn = checkElement('viewFormulasBtn', document.getElementById('viewFormulasBtn'));
        this.statisticsBtn = checkElement('statisticsBtn', document.getElementById('statisticsBtn'));
        this.backToMenuBtn = checkElement('backToMenuBtn', document.getElementById('backToMenuBtn'));
        this.backFromAddBtn = checkElement('backFromAddBtn', document.getElementById('backFromAddBtn'));
        this.backFromViewBtn = checkElement('backFromViewBtn', document.getElementById('backFromViewBtn'));
        this.backFromStatsBtn = checkElement('backFromStatsBtn', document.getElementById('backFromStatsBtn'));
        this.finishTestBtn = checkElement('finishTestBtn', document.getElementById('finishTestBtn'));

        // Добавление формул
        this.newFormulaName = checkElement('newFormulaName', document.getElementById('newFormulaName'));
        this.newFormulaText = checkElement('newFormulaText', document.getElementById('newFormulaText'));
        this.formulaCategory = checkElement('formulaCategory', document.getElementById('formulaCategory'));
        this.saveFormulaBtn = checkElement('saveFormulaBtn', document.getElementById('saveFormulaBtn'));
        this.clearFormulaBtn = checkElement('clearFormulaBtn', document.getElementById('clearFormulaBtn'));
        this.addSuccessMessage = checkElement('addSuccessMessage', document.getElementById('addSuccessMessage'));

        // Просмотр формул
        this.formulasList = checkElement('formulasList', document.getElementById('formulasList'));
        this.emptyFormulasList = checkElement('emptyFormulasList', document.getElementById('emptyFormulasList'));
        this.categoryFilter = checkElement('categoryFilter', document.getElementById('categoryFilter'));
        this.searchFormula = checkElement('searchFormula', document.getElementById('searchFormula'));
        this.clearFilterBtn = checkElement('clearFilterBtn', document.getElementById('clearFilterBtn'));
        this.exportFormulasBtn = checkElement('exportFormulasBtn', document.getElementById('exportFormulasBtn'));
        this.importFormulasBtn = checkElement('importFormulasBtn', document.getElementById('importFormulasBtn'));

        // Статистика
        this.totalTests = checkElement('totalTests', document.getElementById('totalTests'));
        this.avgScore = checkElement('avgScore', document.getElementById('avgScore'));
        this.bestScore = checkElement('bestScore', document.getElementById('bestScore'));
        this.totalFormulasCount = checkElement('totalFormulasCount', document.getElementById('totalFormulasCount'));
        this.historyList = checkElement('historyList', document.getElementById('historyList'));
        this.emptyHistory = checkElement('emptyHistory', document.getElementById('emptyHistory'));
        this.clearStatsBtn = checkElement('clearStatsBtn', document.getElementById('clearStatsBtn'));
        this.resultsChart = null;

        // Модальные окна
        this.importModal = checkElement('importModal', document.getElementById('importModal'));
        this.importDataText = checkElement('importDataText', document.getElementById('importDataText'));
        this.confirmImportBtn = checkElement('confirmImportBtn', document.getElementById('confirmImportBtn'));
        this.cancelImportBtn = checkElement('cancelImportBtn', document.getElementById('cancelImportBtn'));
        this.resetModal = checkElement('resetModal', document.getElementById('resetModal'));
        this.confirmResetBtn = checkElement('confirmResetBtn', document.getElementById('confirmResetBtn'));
        this.cancelResetBtn = checkElement('cancelResetBtn', document.getElementById('cancelResetBtn'));

        // Футер
        this.exportDataBtn = checkElement('exportDataBtn', document.getElementById('exportDataBtn'));
        this.importDataBtn = checkElement('importDataBtn', document.getElementById('importDataBtn'));
        this.resetDataBtn = checkElement('resetDataBtn', document.getElementById('resetDataBtn'));

        // Уведомления
        this.toastContainer = checkElement('toastContainer', document.getElementById('toastContainer'));
        
        console.log('DOM элементы кэшированы');
    }

    // Привязка событий
    bindEvents() {
        console.log('Привязка событий...');
        
        // Основное меню
        this.bindEvent(this.startTestBtn, 'click', () => {
            console.log('Нажата кнопка "Начать тестирование"');
            this.startTest();
        });
        
        this.bindEvent(this.addFormulaBtn, 'click', () => {
            console.log('Нажата кнопка "Добавить формулу"');
            this.showAddFormula();
        });
        
        this.bindEvent(this.viewFormulasBtn, 'click', () => {
            console.log('Нажата кнопка "Все формулы"');
            this.showAllFormulas();
        });
        
        this.bindEvent(this.statisticsBtn, 'click', () => {
            console.log('Нажата кнопка "Статистика"');
            this.showStatistics();
        });

        // Навигация назад
        this.bindEvent(this.backToMenuBtn, 'click', () => {
            console.log('Нажата кнопка "Назад" из тестирования');
            this.showMainMenu();
        });
        
        this.bindEvent(this.backFromAddBtn, 'click', () => {
            console.log('Нажата кнопка "Назад" из добавления формулы');
            this.showMainMenu();
        });
        
        this.bindEvent(this.backFromViewBtn, 'click', () => {
            console.log('Нажата кнопка "Назад" из просмотра формул');
            this.showMainMenu();
        });
        
        this.bindEvent(this.backFromStatsBtn, 'click', () => {
            console.log('Нажата кнопка "Назад" из статистики');
            this.showMainMenu();
        });
        
        this.bindEvent(this.finishTestBtn, 'click', () => {
            console.log('Нажата кнопка "Вернуться в меню"');
            this.showMainMenu();
        });

        // Смена имени пользователя
        this.bindEvent(this.changeUserBtn, 'click', () => {
            console.log('Нажата кнопка смены имени');
            this.showQuickNameModal();
        });
        
        this.bindEvent(this.saveQuickNameBtn, 'click', () => {
            console.log('Нажата кнопка "Сохранить имя"');
            this.saveUserName();
        });
        
        this.bindEvent(this.cancelQuickNameBtn, 'click', () => {
            console.log('Нажата кнопка "Отмена" в смене имени');
            this.hideQuickNameModal();
        });
        
        // Закрытие модального окна по клику вне его
        if (this.quickNameModal) {
            this.quickNameModal.addEventListener('click', (e) => {
                if (e.target === this.quickNameModal) {
                    console.log('Клик вне модального окна смены имени');
                    this.hideQuickNameModal();
                }
            });
        }

        // Поддержка Enter для быстрой смены имени
        if (this.quickNameInput) {
            this.quickNameInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    console.log('Нажат Enter в поле имени');
                    this.saveUserName();
                }
            });
        }

        // Тестирование
        this.bindEvent(this.checkAnswerBtn, 'click', () => {
            console.log('Нажата кнопка "Проверить"');
            this.checkAnswer();
        });
        
        this.bindEvent(this.nextQuestionBtn, 'click', () => {
            console.log('Нажата кнопка "Следующий вопрос"');
            this.nextQuestion();
        });
        
        this.bindEvent(this.skipQuestionBtn, 'click', () => {
            console.log('Нажата кнопка "Пропустить"');
            this.skipQuestion();
        });
        
        if (this.formulaInput) {
            this.formulaInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    console.log('Нажат Enter в поле формулы');
                    this.checkAnswer();
                }
            });
        }

        // Добавление формулы
        this.bindEvent(this.saveFormulaBtn, 'click', () => {
            console.log('Нажата кнопка "Сохранить формулу"');
            this.saveFormula();
        });
        
        this.bindEvent(this.clearFormulaBtn, 'click', () => {
            console.log('Нажата кнопка "Очистить"');
            this.clearFormulaForm();
        });

        // Просмотр формул
        if (this.categoryFilter) {
            this.categoryFilter.addEventListener('change', () => {
                console.log('Изменен фильтр категории');
                this.renderFormulasList();
            });
        }
        
        if (this.searchFormula) {
            this.searchFormula.addEventListener('input', () => {
                console.log('Ввод в поле поиска формул');
                this.renderFormulasList();
            });
        }
        
        this.bindEvent(this.clearFilterBtn, 'click', () => {
            console.log('Нажата кнопка "Очистить фильтр"');
            this.clearFilters();
        });
        
        this.bindEvent(this.exportFormulasBtn, 'click', () => {
            console.log('Нажата кнопка "Экспорт формул"');
            this.exportFormulas();
        });
        
        this.bindEvent(this.importFormulasBtn, 'click', () => {
            console.log('Нажата кнопка "Импорт формул"');
            this.showImportModal();
        });

        // Статистика
        this.bindEvent(this.clearStatsBtn, 'click', () => {
            console.log('Нажата кнопка "Очистить историю"');
            this.clearHistory();
        });

        // Модальные окна
        this.bindEvent(this.confirmImportBtn, 'click', () => {
            console.log('Нажата кнопка "Импортировать"');
            this.confirmImport();
        });
        
        this.bindEvent(this.cancelImportBtn, 'click', () => {
            console.log('Нажата кнопка "Отмена" в импорте');
            this.hideImportModal();
        });
        
        this.bindEvent(this.confirmResetBtn, 'click', () => {
            console.log('Нажата кнопка "Сбросить всё"');
            this.confirmReset();
        });
        
        this.bindEvent(this.cancelResetBtn, 'click', () => {
            console.log('Нажата кнопка "Отмена" в сбросе');
            this.hideResetModal();
        });

        // Футер
        this.bindEvent(this.exportDataBtn, 'click', () => {
            console.log('Нажата кнопка "Экспорт данных"');
            this.exportAllData();
        });
        
        this.bindEvent(this.importDataBtn, 'click', () => {
            console.log('Нажата кнопка "Импорт данных"');
            this.showImportModal();
        });
        
        this.bindEvent(this.resetDataBtn, 'click', () => {
            console.log('Нажата кнопка "Сброс данных"');
            this.showResetModal();
        });
        
        console.log('События привязаны');
    }
    
    // Вспомогательный метод для привязки событий
    bindEvent(element, event, handler) {
        if (element) {
            element.addEventListener(event, handler);
        } else {
            console.error(`Не удалось привязать событие ${event} к элементу: элемент не найден`);
        }
    }

    // Загрузка формул из LocalStorage
    loadFormulas() {
        const savedFormulas = localStorage.getItem('physicsTrainerFormulas');
        if (savedFormulas) {
            console.log('Формулы загружены из LocalStorage');
            return JSON.parse(savedFormulas);
        } else {
            // Стандартные формулы
            console.log('Создание стандартных формул');
            const defaultFormulas = [
                {
                    id: 1,
                    name: "Второй закон Ньютона",
                    formula: "F = m * a",
                    category: "Механика",
                    addedBy: "Гость",
                    date: new Date().toISOString()
                },
                {
                    id: 2,
                    name: "Закон Ома",
                    formula: "I = U / R",
                    category: "Электричество",
                    addedBy: "Гость",
                    date: new Date().toISOString()
                },
                {
                    id: 3,
                    name: "Формула энергии",
                    formula: "E = m * c^2",
                    category: "Механика",
                    addedBy: "Гость",
                    date: new Date().toISOString()
                },
                {
                    id: 4,
                    name: "Формула пути",
                    formula: "S = v * t",
                    category: "Механика",
                    addedBy: "Гость",
                    date: new Date().toISOString()
                },
                {
                    id: 5,
                    name: "Закон Кулона",
                    formula: "F = k * q1 * q2 / r^2",
                    category: "Электричество",
                    addedBy: "Гость",
                    date: new Date().toISOString()
                },
                {
                    id: 6,
                    name: "Формула давления",
                    formula: "p = F / S",
                    category: "Механика",
                    addedBy: "Гость",
                    date: new Date().toISOString()
                },
                {
                    id: 7,
                    name: "Формула работы",
                    formula: "A = F * S",
                    category: "Механика",
                    addedBy: "Гость",
                    date: new Date().toISOString()
                },
                {
                    id: 8,
                    name: "Формула кинетической энергии",
                    formula: "Ek = m * v^2 / 2",
                    category: "Механика",
                    addedBy: "Гость",
                    date: new Date().toISOString()
                },
                {
                    id: 9,
                    name: "Формула потенциальной энергии",
                    formula: "Ep = m * g * h",
                    category: "Механика",
                    addedBy: "Гость",
                    date: new Date().toISOString()
                },
                {
                    id: 10,
                    name: "Формула мощности",
                    formula: "P = A / t",
                    category: "Механика",
                    addedBy: "Гость",
                    date: new Date().toISOString()
                }
            ];
            
            // Сохраняем формулы в LocalStorage
            localStorage.setItem('physicsTrainerFormulas', JSON.stringify(defaultFormulas));
            console.log('Стандартные формулы сохранены в LocalStorage');
            
            return defaultFormulas;
        }
    }

    // Сохранение формул в LocalStorage
    saveFormulas(formulas) {
        console.log('Сохранение формул в LocalStorage');
        localStorage.setItem('physicsTrainerFormulas', JSON.stringify(formulas));
        
        // Обновляем состояние, если оно уже инициализировано
        if (this.state) {
            this.state.formulas = formulas;
        }
        
        console.log(`Формулы сохранены: ${formulas.length} шт.`);
    }

    // Сохранение истории в LocalStorage
    saveHistory() {
        localStorage.setItem('physicsTrainerHistory', JSON.stringify(this.state.history));
        console.log(`История сохранена: ${this.state.history.length} записей`);
    }

    // Показать основное меню
    showMainMenu() {
        console.log('Показать основное меню');
        this.hideAllSections();
        if (this.mainMenu) {
            this.mainMenu.classList.remove('hidden');
        }
        this.updateStatistics();
    }

    // Скрыть все секции
    hideAllSections() {
        console.log('Скрыть все секции');
        [this.mainMenu, this.testSection, this.addFormulaSection, this.viewFormulasSection, this.statisticsSection]
            .forEach(section => {
                if (section) section.classList.add('hidden');
            });
    }

    // Обновить отображение пользователя
    updateUserDisplay() {
        if (this.userNameDisplay) {
            this.userNameDisplay.textContent = this.state.user;
            console.log(`Имя пользователя обновлено: ${this.state.user}`);
        }
    }

    // Показать модальное окно быстрой смены имени
    showQuickNameModal() {
        console.log('Показать модальное окно смены имени');
        if (this.quickNameInput && this.quickNameModal) {
            this.quickNameInput.value = this.state.user;
            this.quickNameModal.classList.remove('hidden');
            this.quickNameInput.focus();
            this.quickNameInput.select();
        }
    }

    // Скрыть модальное окно быстрой смены имени
    hideQuickNameModal() {
        console.log('Скрыть модальное окно смены имени');
        if (this.quickNameModal) {
            this.quickNameModal.classList.add('hidden');
        }
    }

    // Сохранить имя пользователя
    saveUserName() {
        if (!this.quickNameInput) return;
        
        const name = this.quickNameInput.value.trim();
        console.log(`Сохранение имени: "${name}"`);
        
        if (name) {
            this.state.user = name;
            localStorage.setItem('physicsTrainerUser', name);
            this.updateUserDisplay();
            this.hideQuickNameModal();
            this.showToast(`Имя изменено на: ${name}`, 'success');
        } else {
            this.showToast('Введите имя!', 'warning');
        }
    }

    // Начать тестирование
    startTest() {
        console.log('Начало тестирования');
        
        if (this.state.formulas.length === 0) {
            this.showToast('Добавьте формулы для начала тестирования', 'warning');
            return;
        }

        this.state.test = {
            currentQuestion: 0,
            score: 0,
            skipped: 0,
            incorrect: 0,
            answers: [],
            questions: this.getRandomQuestions(10),
            started: true
        };

        console.log(`Тест начат, вопросов: ${this.state.test.questions.length}`);

        this.hideAllSections();
        if (this.testSection) {
            this.testSection.classList.remove('hidden');
        }
        
        if (this.scoreBoard) {
            this.scoreBoard.classList.add('hidden');
        }
        
        if (this.resultContainer) {
            this.resultContainer.classList.add('hidden');
        }
        
        if (this.formulaInput) {
            this.formulaInput.value = '';
            this.formulaInput.disabled = false;
            this.formulaInput.focus();
        }
        
        if (this.checkAnswerBtn) this.checkAnswerBtn.disabled = false;
        if (this.skipQuestionBtn) this.skipQuestionBtn.disabled = false;

        this.showQuestion();
    }

    // Получить случайные вопросы
    getRandomQuestions(count) {
        const shuffled = [...this.state.formulas].sort(() => 0.5 - Math.random());
        const questions = shuffled.slice(0, Math.min(count, shuffled.length));
        console.log(`Сгенерировано ${questions.length} случайных вопросов`);
        return questions;
    }

    // Показать вопрос
    showQuestion() {
        const question = this.state.test.questions[this.state.test.currentQuestion];
        if (!question) {
            console.log('Вопросы закончились, завершение теста');
            this.finishTest();
            return;
        }

        console.log(`Показ вопроса ${this.state.test.currentQuestion + 1}: ${question.name}`);

        if (this.formulaName) this.formulaName.textContent = question.name;
        if (this.currentQuestion) this.currentQuestion.textContent = this.state.test.currentQuestion + 1;
        if (this.totalQuestions) this.totalQuestions.textContent = this.state.test.questions.length;
        
        const progress = ((this.state.test.currentQuestion) / this.state.test.questions.length) * 100;
        if (this.progressFill) {
            this.progressFill.style.width = `${progress}%`;
        }

        if (this.formulaInput) {
            this.formulaInput.focus();
        }
    }

    // Проверить ответ
    checkAnswer() {
        if (!this.formulaInput) return;
        
        const userAnswer = this.formulaInput.value.trim();
        const question = this.state.test.questions[this.state.test.currentQuestion];
        
        console.log(`Проверка ответа: "${userAnswer}" для формулы "${question.formula}"`);
        
        if (!userAnswer) {
            this.showToast('Введите формулу!', 'warning');
            return;
        }

        const isCorrect = this.normalizeFormula(userAnswer) === this.normalizeFormula(question.formula);
        console.log(`Ответ ${isCorrect ? 'правильный' : 'неправильный'}`);

        // Сохранить ответ
        this.state.test.answers.push({
            question: question.name,
            userAnswer: userAnswer,
            correctAnswer: question.formula,
            isCorrect: isCorrect,
            isSkipped: false
        });

        // Обновить счет
        if (isCorrect) {
            this.state.test.score++;
        } else {
            this.state.test.incorrect++;
        }

        // Показать результат
        this.showResult(isCorrect, question.formula);
    }

    // Нормализовать формулу для сравнения
    normalizeFormula(formula) {
        return formula
            .toLowerCase()
            .replace(/\s+/g, '')
            .replace(/×/g, '*')
            .replace(/·/g, '*')
            .replace(/÷/g, '/')
            .replace(/\^/g, '**')
            .replace(/²/g, '**2')
            .replace(/³/g, '**3');
    }

    // Показать результат
    showResult(isCorrect, correctAnswer) {
        console.log(`Показать результат: ${isCorrect ? 'правильно' : 'неправильно'}`);
        
        if (this.formulaInput) this.formulaInput.disabled = true;
        if (this.checkAnswerBtn) this.checkAnswerBtn.disabled = true;
        if (this.skipQuestionBtn) this.skipQuestionBtn.disabled = true;

        if (this.resultContainer) {
            this.resultContainer.classList.remove('hidden');
        }

        if (this.resultMessage) {
            if (isCorrect) {
                this.resultMessage.textContent = '✅ Правильно!';
                this.resultMessage.className = 'result-message correct';
                if (this.correctAnswerContainer) {
                    this.correctAnswerContainer.classList.add('hidden');
                }
            } else {
                this.resultMessage.textContent = '❌ Неправильно!';
                this.resultMessage.className = 'result-message incorrect';
                if (this.correctAnswer && this.correctAnswerContainer) {
                    this.correctAnswer.textContent = correctAnswer;
                    this.correctAnswerContainer.classList.remove('hidden');
                }
            }
        }
    }

    // Пропустить вопрос
    skipQuestion() {
        const question = this.state.test.questions[this.state.test.currentQuestion];
        console.log(`Пропуск вопроса: ${question.name}`);
        
        this.state.test.answers.push({
            question: question.name,
            userAnswer: '',
            correctAnswer: question.formula,
            isCorrect: false,
            isSkipped: true
        });

        this.state.test.skipped++;
        this.nextQuestion();
    }

    // Следующий вопрос
    nextQuestion() {
        console.log('Переход к следующему вопросу');
        this.state.test.currentQuestion++;
        
        if (this.state.test.currentQuestion < this.state.test.questions.length) {
            if (this.resultContainer) this.resultContainer.classList.add('hidden');
            if (this.correctAnswerContainer) this.correctAnswerContainer.classList.add('hidden');
            if (this.formulaInput) {
                this.formulaInput.value = '';
                this.formulaInput.disabled = false;
            }
            if (this.checkAnswerBtn) this.checkAnswerBtn.disabled = false;
            if (this.skipQuestionBtn) this.skipQuestionBtn.disabled = false;
            this.showQuestion();
        } else {
            this.finishTest();
        }
    }

    // Завершить тест
    finishTest() {
        const total = this.state.test.questions.length;
        const correct = this.state.test.score;
        const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
        const grade = this.getGrade(percentage);

        console.log(`Завершение теста: ${correct}/${total} = ${percentage}%, оценка: ${grade}`);

        // Обновить отображение результатов
        if (this.correctCount) this.correctCount.textContent = correct;
        if (this.incorrectCount) this.incorrectCount.textContent = this.state.test.incorrect;
        if (this.skippedCount) this.skippedCount.textContent = this.state.test.skipped;
        if (this.totalCount) this.totalCount.textContent = total;
        if (this.percentage) this.percentage.textContent = `${percentage}%`;
        if (this.grade) this.grade.textContent = `Оценка: ${grade}`;

        // Показать таблицу результатов
        if (this.scoreBoard) {
            this.scoreBoard.classList.remove('hidden');
        }

        // Сохранить в историю
        const testResult = {
            id: Date.now(),
            date: new Date().toLocaleString('ru-RU'),
            user: this.state.user,
            correct: correct,
            total: total,
            percentage: percentage,
            grade: grade,
            answers: this.state.test.answers
        };

        this.state.history.unshift(testResult);
        this.saveHistory();

        // Сбросить состояние теста
        this.state.test.started = false;
        
        // Показать поздравление для отличных результатов
        if (percentage === 100) {
            this.showToast('🎉 Отличный результат! 100% правильных ответов!', 'success');
        } else if (percentage >= 85) {
            this.showToast('👍 Отличная работа! Вы хорошо знаете формулы!', 'success');
        }
    }

    // Получить оценку
    getGrade(percentage) {
        if (percentage === 100) return 'Отлично (5)';
        if (percentage >= 85) return 'Отлично (5)';
        if (percentage >= 70) return 'Хорошо (4)';
        if (percentage >= 55) return 'Удовлетворительно (3)';
        if (percentage >= 40) return 'Неудовлетворительно (2)';
        return 'Неудовлетворительно (2)';
    }

    // Показать секцию добавления формулы
    showAddFormula() {
        console.log('Показать секцию добавления формулы');
        this.hideAllSections();
        if (this.addFormulaSection) {
            this.addFormulaSection.classList.remove('hidden');
        }
        this.clearFormulaForm();
        if (this.newFormulaName) {
            this.newFormulaName.focus();
        }
    }

    // Очистить форму добавления формулы
    clearFormulaForm() {
        console.log('Очистить форму добавления формулы');
        if (this.newFormulaName) this.newFormulaName.value = '';
        if (this.newFormulaText) this.newFormulaText.value = '';
        if (this.formulaCategory) this.formulaCategory.value = 'Механика';
        if (this.addSuccessMessage) this.addSuccessMessage.classList.add('hidden');
    }

    // Сохранить формулу
    saveFormula() {
        console.log('Сохранение формулы');
        
        if (!this.newFormulaName || !this.newFormulaText) return;
        
        const name = this.newFormulaName.value.trim();
        const formula = this.newFormulaText.value.trim();
        const category = this.formulaCategory ? this.formulaCategory.value : 'Механика';

        if (!name) {
            this.showToast('Введите название формулы!', 'warning');
            if (this.newFormulaName) this.newFormulaName.focus();
            return;
        }

        if (!formula) {
            this.showToast('Введите формулу!', 'warning');
            if (this.newFormulaText) this.newFormulaText.focus();
            return;
        }

        // Проверить, существует ли уже такая формула
        const exists = this.state.formulas.some(f => 
            f.name.toLowerCase() === name.toLowerCase() || 
            this.normalizeFormula(f.formula) === this.normalizeFormula(formula)
        );

        if (exists) {
            this.showToast('Такая формула уже существует!', 'warning');
            return;
        }

        // Добавить новую формулу
        const newFormula = {
            id: Date.now(),
            name: name,
            formula: formula,
            category: category,
            addedBy: this.state.user,
            date: new Date().toISOString()
        };

        this.state.formulas.push(newFormula);
        this.saveFormulas(this.state.formulas);

        // Показать сообщение об успехе
        if (this.addSuccessMessage) {
            this.addSuccessMessage.classList.remove('hidden');
        }
        this.showToast('Формула успешно добавлена!', 'success');

        // Очистить форму через 2 секунды
        setTimeout(() => {
            this.clearFormulaForm();
        }, 2000);
    }

    // Показать все формулы
    showAllFormulas() {
        console.log('Показать все формулы');
        this.hideAllSections();
        if (this.viewFormulasSection) {
            this.viewFormulasSection.classList.remove('hidden');
        }
        this.renderFormulasList();
    }

    // Отрендерить список формул
    renderFormulasList() {
        console.log('Рендеринг списка формул');
        
        if (!this.formulasList || !this.emptyFormulasList) return;
        
        const categoryFilter = this.categoryFilter ? this.categoryFilter.value : 'all';
        const searchQuery = this.searchFormula ? this.searchFormula.value.toLowerCase() : '';

        let filteredFormulas = this.state.formulas;

        // Применить фильтр по категории
        if (categoryFilter !== 'all') {
            filteredFormulas = filteredFormulas.filter(f => f.category === categoryFilter);
        }

        // Применить поиск
        if (searchQuery) {
            filteredFormulas = filteredFormulas.filter(f => 
                f.name.toLowerCase().includes(searchQuery) || 
                f.formula.toLowerCase().includes(searchQuery)
            );
        }

        // Очистить список
        this.formulasList.innerHTML = '';

        // Показать сообщение, если формул нет
        if (filteredFormulas.length === 0) {
            this.emptyFormulasList.classList.remove('hidden');
            return;
        }

        this.emptyFormulasList.classList.add('hidden');

        // Отобразить формулы
        filteredFormulas.forEach(formula => {
            const formulaCard = this.createFormulaCard(formula);
            this.formulasList.appendChild(formulaCard);
        });
        
        console.log(`Отображено ${filteredFormulas.length} формул`);
    }

    // Создать карточку формулы
    createFormulaCard(formula) {
        const card = document.createElement('div');
        card.className = 'formula-card';

        card.innerHTML = `
            <div class="formula-header">
                <div class="formula-name">${formula.name}</div>
                <div class="formula-category">${formula.category}</div>
            </div>
            <div class="formula-text">${formula.formula}</div>
            <div class="formula-info">
                <small>Добавил: ${formula.addedBy}</small>
            </div>
            <div class="formula-actions">
                <button class="delete-formula-btn" data-id="${formula.id}">
                    <i class="fas fa-trash"></i> Удалить
                </button>
            </div>
        `;

        // Добавить обработчик удаления
        const deleteBtn = card.querySelector('.delete-formula-btn');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => this.deleteFormula(formula.id));
        }

        return card;
    }

    // Удалить формулу
    deleteFormula(id) {
        if (!confirm('Вы уверены, что хотите удалить эту формулу?')) {
            return;
        }

        this.state.formulas = this.state.formulas.filter(f => f.id !== id);
        this.saveFormulas(this.state.formulas);
        this.renderFormulasList();
        this.showToast('Формула удалена', 'success');
        this.updateStatistics();
    }

    // Очистить фильтры
    clearFilters() {
        console.log('Очистка фильтров');
        if (this.categoryFilter) this.categoryFilter.value = 'all';
        if (this.searchFormula) this.searchFormula.value = '';
        this.renderFormulasList();
    }

    // Экспорт формул
    exportFormulas() {
        console.log('Экспорт формул');
        const data = {
            formulas: this.state.formulas,
            exportedAt: new Date().toISOString(),
            version: '1.0'
        };

        this.downloadJSON(data, 'physics_formulas.json');
        this.showToast('Формулы экспортированы', 'success');
    }

    // Показать статистику
    showStatistics() {
        console.log('Показать статистику');
        this.hideAllSections();
        if (this.statisticsSection) {
            this.statisticsSection.classList.remove('hidden');
        }
        this.updateStatistics();
        this.renderHistory();
        this.renderChart();
    }

    // Обновить статистику
    updateStatistics() {
        console.log('Обновление статистики');
        
        // Общие данные
        if (this.totalFormulasCount) {
            this.totalFormulasCount.textContent = this.state.formulas.length;
        }

        // Статистика тестов
        const totalTests = this.state.history.length;
        if (this.totalTests) {
            this.totalTests.textContent = totalTests;
        }

        if (totalTests > 0) {
            const avgScore = Math.round(
                this.state.history.reduce((sum, test) => sum + test.percentage, 0) / totalTests
            );
            const bestScore = Math.max(...this.state.history.map(test => test.percentage));

            if (this.avgScore) this.avgScore.textContent = `${avgScore}%`;
            if (this.bestScore) this.bestScore.textContent = `${bestScore}%`;
        } else {
            if (this.avgScore) this.avgScore.textContent = '0%';
            if (this.bestScore) this.bestScore.textContent = '0%';
        }
    }

    // Отрендерить историю
    renderHistory() {
        console.log('Рендеринг истории');
        
        if (!this.historyList || !this.emptyHistory) return;
        
        this.historyList.innerHTML = '';

        if (this.state.history.length === 0) {
            this.emptyHistory.classList.remove('hidden');
            return;
        }

        this.emptyHistory.classList.add('hidden');

        // Показать последние 10 тестов
        const recentTests = this.state.history.slice(0, 10);

        recentTests.forEach(test => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';

            historyItem.innerHTML = `
                <div class="history-info">
                    <div class="history-date">${test.date}</div>
                    <div class="history-user">${test.user}</div>
                </div>
                <div class="history-score">${test.percentage}%</div>
                <div class="history-grade">${test.correct}/${test.total} - ${test.grade}</div>
            `;

            this.historyList.appendChild(historyItem);
        });
        
        console.log(`Отображено ${recentTests.length} записей истории`);
    }

    // Отрендерить график
    renderChart() {
        console.log('Рендеринг графика');
        const ctx = document.getElementById('resultsChart');
        if (!ctx) {
            console.error('Canvas для графика не найден');
            return;
        }

        const context = ctx.getContext('2d');

        // Разбить по оценкам
        const grades = {
            excellent: this.state.history.filter(h => h.percentage >= 85).length,
            good: this.state.history.filter(h => h.percentage >= 70 && h.percentage < 85).length,
            satisfactory: this.state.history.filter(h => h.percentage >= 55 && h.percentage < 70).length,
            unsatisfactory: this.state.history.filter(h => h.percentage < 55).length
        };

        // Уничтожить предыдущий график, если он существует
        if (this.resultsChart) {
            this.resultsChart.destroy();
        }

        this.resultsChart = new Chart(context, {
            type: 'pie',
            data: {
                labels: ['Отлично (85-100%)', 'Хорошо (70-84%)', 'Удовлетворительно (55-69%)', 'Неудовлетворительно (0-54%)'],
                datasets: [{
                    data: [grades.excellent, grades.good, grades.satisfactory, grades.unsatisfactory],
                    backgroundColor: [
                        '#4caf50',
                        '#2196f3',
                        '#ff9800',
                        '#f44336'
                    ],
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed || 0;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
                                return `${label}: ${value} (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }

    // Очистить историю
    clearHistory() {
        if (!confirm('Вы уверены, что хотите очистить всю историю тестирований?')) {
            return;
        }

        this.state.history = [];
        this.saveHistory();
        this.renderHistory();
        this.updateStatistics();
        this.renderChart();
        this.showToast('История очищена', 'success');
    }

    // Показать модальное окно импорта
    showImportModal() {
        console.log('Показать модальное окно импорта');
        if (this.importDataText && this.importModal) {
            this.importDataText.value = '';
            this.importModal.classList.remove('hidden');
            this.importDataText.focus();
        }
    }

    // Скрыть модальное окно импорта
    hideImportModal() {
        console.log('Скрыть модальное окно импорта');
        if (this.importModal) {
            this.importModal.classList.add('hidden');
        }
    }

    // Подтвердить импорт
    confirmImport() {
        console.log('Подтверждение импорта');
        if (!this.importDataText) return;
        
        try {
            const data = JSON.parse(this.importDataText.value);
            
            if (data.formulas && Array.isArray(data.formulas)) {
                this.state.formulas = data.formulas;
                this.saveFormulas(this.state.formulas);
                this.hideImportModal();
                this.renderFormulasList();
                this.updateStatistics();
                this.showToast('Данные успешно импортированы!', 'success');
            } else {
                throw new Error('Неверный формат данных');
            }
        } catch (error) {
            console.error('Ошибка импорта:', error);
            this.showToast('Ошибка импорта: неверный формат JSON', 'error');
        }
    }

    // Показать модальное окно сброса
    showResetModal() {
        console.log('Показать модальное окно сброса');
        if (this.resetModal) {
            this.resetModal.classList.remove('hidden');
        }
    }

    // Скрыть модальное окно сброса
    hideResetModal() {
        console.log('Скрыть модальное окно сброса');
        if (this.resetModal) {
            this.resetModal.classList.add('hidden');
        }
    }

    // Подтвердить сброс
    confirmReset() {
        console.log('Подтверждение сброса данных');
        // Сбросить всё
        localStorage.removeItem('physicsTrainerFormulas');
        localStorage.removeItem('physicsTrainerHistory');
        localStorage.removeItem('physicsTrainerUser');
        
        // Перезагрузить страницу
        location.reload();
    }

    // Экспорт всех данных
    exportAllData() {
        console.log('Экспорт всех данных');
        const data = {
            formulas: this.state.formulas,
            history: this.state.history,
            user: this.state.user,
            exportedAt: new Date().toISOString(),
            version: '1.0'
        };

        this.downloadJSON(data, 'physics_trainer_backup.json');
        this.showToast('Все данные экспортированы', 'success');
    }

    // Скачать JSON файл
    downloadJSON(data, filename) {
        console.log(`Скачивание JSON файла: ${filename}`);
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Показать уведомление
    showToast(message, type = 'success') {
        console.log(`Показать уведомление: ${message} (${type})`);
        if (!this.toastContainer) return;
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'exclamation-triangle'}"></i>
            <span>${message}</span>
        `;

        this.toastContainer.appendChild(toast);

        // Удалить уведомление через 3 секунды
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
}

// Инициализация приложения после загрузки страницы
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM полностью загружен и разобран');
    try {
        const app = new PhysicsTrainer();
        
        // Сохранить глобально для отладки
        window.physicsTrainer = app;
        
        console.log('Приложение успешно инициализировано');
    } catch (error) {
        console.error('Ошибка при инициализации приложения:', error);
    }
});