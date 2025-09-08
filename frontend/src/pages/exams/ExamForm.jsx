import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ExamForm = () => {
  const { id, title } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/question/by-module-type/inicial")
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

  if (loading) return <div>Cargando cuestionario...</div>;

  return (
    <div className="max-w-3xl px-4 py-8 mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-[#256B3E]">
        {title ? decodeURIComponent(title) : "Cuestionario"}
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
      {/* Aquí puedes agregar un botón para enviar las respuestas */}
      {/* <button className="mt-8 px-6 py-2 bg-[#256B3E] text-white rounded-xl font-bold">Enviar</button> */}
    </div>
  );
};

export default ExamForm;
