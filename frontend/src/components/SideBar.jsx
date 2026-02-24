import React, { useRef, useState, useEffect } from 'react'
import { sidebarStyles } from '../assets/dummystyle'
import questionsData from '../assets/dummydata'
import { Code, Coffee, Cpu, Database, Globe, Layout, Star, Target, Terminal, Zap } from 'lucide-react';

const API_BASE = 'http://localhost:4000';

const SideBar = () => {

    const [selectedTech, setSelectedTech] = useState(null);
    const [selectedLevel, setSelectedLevel] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);

    const submittedRef = useRef(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const asideRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) setIsSidebarOpen(true);
            else setIsSidebarOpen(false);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (window.innerWidth < 768) {
            if (isSidebarOpen) document.body.style.overflow = "hidden";
            else document.body.style.overflow = "";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isSidebarOpen]);

    // Get questions based on selected technology and level
    const getQuestions = () => {
        if (!selectedTech || !selectedLevel) return [];
        return questionsData[selectedTech]?.[selectedLevel] || [];
    };

    //tech & level

    const technologies = [
        {
            id: "html",
            name: "HTML",
            icon: <Globe size={20} />,
            color: "bg-orange-50 text-orange-600 border-orange-200",
        },
        {
            id: "css",
            name: "CSS",
            icon: <Layout size={20} />,
            color: "bg-blue-50 text-blue-600 border-blue-200",
        },
        {
            id: "js",
            name: "JavaScript",
            icon: <Code size={20} />,
            color: "bg-yellow-50 text-yellow-600 border-yellow-200",
        },
        {
            id: "react",
            name: "React",
            icon: <Cpu size={20} />,
            color: "bg-cyan-50 text-cyan-600 border-cyan-200",
        },
        {
            id: "node",
            name: "Node.js",
            icon: <Code size={20} />,
            color: "bg-green-50 text-green-600 border-green-200",
        },
        {
            id: "mongodb",
            name: "MongoDB",
            icon: <Database size={20} />,
            color: "bg-emerald-50 text-emerald-600 border-emerald-200",
        },
        {
            id: "java",
            name: "Java",
            icon: <Coffee size={20} />,
            color: "bg-red-50 text-red-600 border-red-200",
        },
        {
            id: "python",
            name: "Python",
            icon: <Terminal size={20} />,
            color: "bg-indigo-50 text-indigo-600 border-indigo-200",
        },
        {
            id: "cpp",
            name: "C++",
            icon: <Code size={20} />,
            color: "bg-purple-50 text-purple-600 border-purple-200",
        },
        {
            id: "bootstrap",
            name: "Bootstrap",
            icon: <Layout size={20} />,
            color: "bg-pink-50 text-pink-600 border-pink-200",
        },
    ];

    const levels = [
        {
            id: "basic",
            name: "Basic",
            questions: 20,
            icon: <Star size={16} />,
            color: "bg-green-50 text-green-600",
        },
        {
            id: "intermediate",
            name: "Intermediate",
            questions: 40,
            icon: <Zap size={16} />,
            color: "bg-blue-50 text-blue-600",
        },
        {
            id: "advanced",
            name: "Advanced",
            questions: 60,
            icon: <Target size={16} />,
            color: "bg-purple-50 text-purple-600",
        },
    ];

    //handle what you select

    const handleTechSelect = (techId) => {
        if (selectedTech === techId) {
            setSelectedTech(null);
            setSelectedLevel(null);
        } else {
            setSelectedTech(techId);
            setSelectedLevel(null);
        }
        setCurrentQuestion(0);
        setUserAnswers({});
        setShowResults(false);
        submittedRef.current = false;

        if (window.innerWidth < 768) setIsSidebarOpen(true);

        setTimeout(() => {
            const el = asideRef.current?.querySelector(`[data-tech="${techId}"]`);
            if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 120);
    };

    const handleLevelSelect = (levelId) => {
        setSelectedLevel(levelId);
        setCurrentQuestion(0);
        setUserAnswers({});
        setShowResults(false);
        submittedRef.current = false;

        if (window.innerWidth < 768) setIsSidebarOpen(false)
    };

    const handleAnswerSelect = (answerIndex) => {
        const newAnswers = {
            ...userAnswers,
            [currentQuestion]: answerIndex
        };
        setUserAnswers(newAnswers);
        setTimeout(() => {
            const questions = getQuestions();
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion((prev) => prev + 1);
            }
            else {
                setShowResults(true);
            }
        }, 500)
    }

    const handleSubmitQuiz = async () => {
        if (submittedRef.current) return;
        submittedRef.current = true;

        const questions = getQuestions();
        let correctCount = 0;

        // Count correct answers
        Object.keys(userAnswers).forEach((qIndex) => {
            const idx = parseInt(qIndex);
            if (questions[idx] && userAnswers[idx] === questions[idx].correctAnswer) {
                correctCount++;
            }
        });

        const token = localStorage.getItem('authToken');
        const user = JSON.parse(localStorage.getItem('currentUser') || '{}');

        try {
            const response = await fetch(`${API_BASE}/api/results`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: `${selectedTech.toUpperCase()} - ${selectedLevel}`,
                    technology: selectedTech,
                    level: selectedLevel,
                    totalQuestions: questions.length,
                    correct: correctCount,
                    wrong: questions.length - correctCount
                })
            });

            if (response.ok) {
                alert('Result saved successfully!');
            }
        } catch (err) {
            console.error('Error submitting result:', err);
        }
    };

    const resetQuiz = () => {
        setSelectedTech(null);
        setSelectedLevel(null);
        setCurrentQuestion(0);
        setUserAnswers({});
        setShowResults(false);
        submittedRef.current = false;
    };

    const questions = getQuestions();
    const currentQuestionData = questions[currentQuestion];

    return (
        <div className={sidebarStyles.pageContainer}>
            <div className={sidebarStyles.container}>
                {/* Sidebar Overlay for Mobile */}
                {isSidebarOpen && window.innerWidth < 768 && (
                    <div
                        className={sidebarStyles.sidebarOverlay}
                        onClick={() => setIsSidebarOpen(false)}
                    ></div>
                )}

                {/* Sidebar */}
                <aside
                    ref={asideRef}
                    className={`${sidebarStyles.sidebar} ${isSidebarOpen ? sidebarStyles.sidebarOpen : sidebarStyles.sidebarClosed
                        }`}
                >
                    <div className={sidebarStyles.sidebarContent}>
                        <h3 className={sidebarStyles.sidebarHeading}>Select Technology</h3>
                        <div className={sidebarStyles.techGrid}>
                            {technologies.map((tech) => (
                                <button
                                    key={tech.id}
                                    data-tech={tech.id}
                                    onClick={() => handleTechSelect(tech.id)}
                                    className={`${sidebarStyles.techButton} ${selectedTech === tech.id ? sidebarStyles.techButtonActive : sidebarStyles.techButtonInactive} ${tech.color}`}
                                >
                                    {tech.icon}
                                    <span>{tech.name}</span>
                                </button>
                            ))}
                        </div>

                        {selectedTech && (
                            <>
                                <h3 className={sidebarStyles.sidebarHeading}>Select Level</h3>
                                <div className={sidebarStyles.levelGrid}>
                                    {levels.map((level) => (
                                        <button
                                            key={level.id}
                                            onClick={() => handleLevelSelect(level.id)}
                                            className={`${sidebarStyles.levelButton} ${selectedLevel === level.id ? sidebarStyles.levelButtonActive : sidebarStyles.levelButtonInactive} ${level.color}`}
                                        >
                                            {level.icon}
                                            <div>
                                                <div className={sidebarStyles.levelName}>{level.name}</div>
                                                <div className={sidebarStyles.levelQuestions}>{level.questions} Qs</div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </aside>

                {/* Main Content */}
                <main className={sidebarStyles.mainContent}>
                    {!selectedLevel ? (
                        <div className={sidebarStyles.emptyState}>
                            <div className={sidebarStyles.emptyStateContent}>
                                <Target size={48} className={sidebarStyles.emptyStateIcon} />
                                <h2 className={sidebarStyles.emptyStateHeading}>Welcome to Quiz App</h2>
                                <p className={sidebarStyles.emptyStateText}>
                                    Select a technology and difficulty level to start taking quizzes.
                                </p>
                            </div>
                        </div>
                    ) : showResults ? (
                        <div className={sidebarStyles.resultsContainer}>
                            <div className={sidebarStyles.resultsCard}>
                                <h2 className={sidebarStyles.resultsHeading}>Quiz Results</h2>
                                <div className={sidebarStyles.resultsSummary}>
                                    <div className={sidebarStyles.resultItem}>
                                        <span>Technology:</span>
                                        <strong>{selectedTech.toUpperCase()}</strong>
                                    </div>
                                    <div className={sidebarStyles.resultItem}>
                                        <span>Level:</span>
                                        <strong>{selectedLevel}</strong>
                                    </div>
                                    <div className={sidebarStyles.resultItem}>
                                        <span>Total Questions:</span>
                                        <strong>{questions.length}</strong>
                                    </div>
                            <div className={sidebarStyles.resultItem}>
                                        <span>Correct Answers:</span>
                                        <strong className={sidebarStyles.correctText}>
                                            {Object.keys(userAnswers).filter(
                                                (idx) => questions[parseInt(idx)] && userAnswers[parseInt(idx)] === questions[parseInt(idx)].correctAnswer
                                            ).length}
                                        </strong>
                                    </div>
                                    <div className={sidebarStyles.resultItem}>
                                        <span>Wrong Answers:</span>
                                        <strong className={sidebarStyles.wrongText}>
                                            {Object.keys(userAnswers).filter(
                                                (idx) => questions[parseInt(idx)] && userAnswers[parseInt(idx)] !== questions[parseInt(idx)].correctAnswer
                                            ).length}
                                        </strong>
                                    </div>
                                    <div className={sidebarStyles.scoreItem}>
                                        <span>Score:</span>
                                        <div className={sidebarStyles.scoreValue}>
                                            {Math.round((Object.keys(userAnswers).filter(
                                                (idx) => questions[parseInt(idx)] && userAnswers[parseInt(idx)] === questions[parseInt(idx)].correctAnswer
                                            ).length / questions.length) * 100)}%
                                        </div>
                                    </div>
                                </div>
                                <div className={sidebarStyles.resultsActions}>
                                    <button
                                        onClick={handleSubmitQuiz}
                                        className={sidebarStyles.submitButton}
                                    >
                                        Save Result
                                    </button>
                                    <button
                                        onClick={resetQuiz}
                                        className={sidebarStyles.resetButton}
                                    >
                                        Take Another Quiz
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={sidebarStyles.questionContainer}>
                            <div className={sidebarStyles.progressBar}>
                                <div className={sidebarStyles.progress} style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}></div>
                            </div>
                            <div className={sidebarStyles.questionNumber}>
                                Question {currentQuestion + 1} of {questions.length}
                            </div>

                            {currentQuestionData && (
                                <>
                                    <h3 className={sidebarStyles.questionText}>{currentQuestionData.question}</h3>
                                    <div className={sidebarStyles.optionsContainer}>
                                        {currentQuestionData.options.map((option, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleAnswerSelect(index)}
                                                className={`${sidebarStyles.optionButton} ${userAnswers[currentQuestion] === index ? sidebarStyles.optionButtonSelected : ''}`}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}

export default SideBar