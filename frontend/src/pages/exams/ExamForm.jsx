import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

const ExamForm = () => {
  const { id, type } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    fetch(`${API_BASE_URL}/question/by-module-type/${type}`)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      });
  }, []);

  // Agrupa preguntas por sección
  const grouped = questions.reduce((acc, q) => {
    acc[q.section] = acc[q.section] || [];
    acc[q.section].push(q);
    return acc;
  }, {});

  const handleChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError(null);

    try {
      const payload = {
        user_id: userId,
        module_id: id,
        answers: Object.entries(answers).map(
          ([question_id, selected_option]) => ({
            question_id,
            user_id: userId,
            selected_option,
          })
        ),
      };

      const res = await fetch(`${API_BASE_URL}/user-answer/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Error enviando respuestas");

      setSubmitSuccess(true);

      navigate("/exams");
    } catch (err) {
      setSubmitError("No se pudo enviar el cuestionario. Intenta de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div>Cargando cuestionario...</div>;

  return (
    <form className="max-w-3xl px-4 py-8 mx-auto" onSubmit={handleSubmit}>
      <h1 className="text-3xl font-bold mb-8 text-[#256B3E]">
        {type === "inicial" ? "Cuestionario Inicial" : "Cuestionario Final"}
      </h1>
      {Object.entries(grouped).map(([section, qs]) => (
        <div key={section} className="mb-10">
          <h2 className="text-xl font-semibold mb-4 text-[#F4A300]">
            {section}
          </h2>
          <div className="space-y-6">
            {qs
              .sort((a, b) => a.order - b.order)
              .map((q, idx) => (
                <div
                  key={q.id}
                  className="p-4 bg-white border shadow rounded-xl"
                >
                  <div className="mb-2 font-medium">
                    {q.order}. {q.text}
                  </div>
                  <div className="flex gap-4">
                    {q.options.map((opt) => (
                      <label key={opt} className="flex flex-col items-center">
                        <input
                          type="radio"
                          name={q.id}
                          value={opt}
                          checked={answers[q.id] === opt}
                          onChange={() => handleChange(q.id, opt)}
                          className="accent-[#F4A300] w-5 h-5"
                          required={idx === 0}
                        />
                        <span className="mt-1 text-sm">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}

      {submitError && (
        <div className="mb-4 font-medium text-red-600">{submitError}</div>
      )}
      {submitSuccess && (
        <div className="mb-4 font-medium text-green-700">
          ¡Cuestionario enviado correctamente!
        </div>
      )}

      <button
        type="submit"
        className="mt-8 px-6 py-2 bg-[#256B3E] text-white rounded-xl font-bold disabled:opacity-60"
        disabled={submitting}
      >
        {submitting ? "Enviando..." : "Enviar respuestas"}
      </button>
    </form>
  );
};

export default ExamForm;
