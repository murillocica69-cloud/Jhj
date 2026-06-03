import { useState, useCallback } from "react";

const SYSTEM_TEMA = `Você é especialista em filosofia estoica e criação de conteúdo filosófico para Instagram.

Quando receber um tema, gere um carrossel completo de 5 slides para a página Dravtus.

Regras de conteúdo:
- Linguagem em português brasileiro, direta e densa
- Nunca use "a maioria das pessoas" como estrutura principal
- Todo slide precisa de argumento, não só observação
- O slide 3 deve sempre ancorar em um filósofo ou conceito real identificável
- O slide 5 deve ser uma frase que o leitor quer salvar e mandar para alguém
- Tom: intelectual, íntimo, desconfortável de forma produtiva — não motivacional

Responda APENAS em JSON válido neste formato exato:

{
  "tema": "tema recebido",
  "slides": [
    {
      "numero": 1,
      "funcao": "Gancho",
      "texto": "texto do slide em português",
      "prompt": "prompt completo em inglês para Leonardo AI"
    },
    {
      "numero": 2,
      "funcao": "O que se assume",
      "texto": "texto do slide em português",
      "prompt": "prompt completo em inglês para Leonardo AI"
    },
    {
      "numero": 3,
      "funcao": "Virada filosófica",
      "texto": "texto do slide em português",
      "prompt": "prompt completo em inglês para Leonardo AI"
    },
    {
      "numero": 4,
      "funcao": "Aplicação",
      "texto": "texto do slide em português",
      "prompt": "prompt completo em inglês para Leonardo AI"
    },
    {
      "numero": 5,
      "funcao": "Síntese",
      "texto": "texto do slide em português",
      "prompt": "prompt completo em inglês para Leonardo AI"
    }
  ],
  "legenda": "legenda em primeira pessoa para o post, 3 a 5 linhas, termina com uma pergunta específica para o leitor"
}

Identidade visual obrigatória em todos os prompts:
- graphic novel illustration style, comic book art
- dark teal and burnt orange color palette, amber and golden light
- dramatic chiaroscuro lighting
- solitary cloaked figure or symbolic philosophical scene
- ancient ruins, arches, columns, caves, clifftops or portals
- highly detailed, cinematic composition
- 9:16 vertical format
- no text, no watermark, no modern clothing
- cada prompt deve ser visualmente diferente dos outros do mesmo carrossel, criando progressão visual`;

const SYSTEM_ROTEIRO = `Você é especialista em geração de imagens para IA e identidade visual filosófica.

Quando receber os textos dos 5 slides, analise o conteúdo de cada um e gere um prompt de imagem específico para cada slide.

Responda APENAS em JSON válido neste formato exato:

{
  "slides": [
    {
      "numero": 1,
      "texto_original": "texto recebido",
      "prompt": "prompt completo em inglês para Leonardo AI"
    }
  ]
}

Identidade visual obrigatória em todos os prompts:
- graphic novel illustration style, comic book art
- dark teal and burnt orange color palette, amber and golden light
- dramatic chiaroscuro lighting
- solitary cloaked figure or symbolic philosophical scene
- ancient ruins, arches, columns, caves, clifftops or portals
- highly detailed, cinematic composition
- 9:16 vertical format
- no text, no watermark, no modern clothing
- cada slide deve ter imagem visualmente distinta, criando progressão narrativa ao longo do carrossel`;

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      style={{
        background: copied ? "#1a4a2a" : "transparent",
        border: `1px solid ${copied ? "#2d7a4a" : "#2a5a5a"}`,
        color: copied ? "#4ade80" : "#7ab8b8",
        padding: "4px 12px",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "11px",
        fontFamily: "'Courier New', monospace",
        letterSpacing: "0.05em",
        transition: "all 0.2s ease",
        flexShrink: 0,
      }}
    >
      {copied ? "✓ COPIADO" : "COPIAR"}
    </button>
  );
}

function SlideCard({ slide, index, mode }) {
  const funcaoColors = {
    "Gancho": "#e05c2a",
    "O que se assume": "#c4852a",
    "Virada filosófica": "#d4a43a",
    "Aplicação": "#a8c060",
    "Síntese": "#4a9a9a",
  };

  const funcao = mode === "tema" ? slide.funcao : ["Gancho", "O que se assume", "Virada filosófica", "Aplicação", "Síntese"][slide.numero - 1];
  const texto = mode === "tema" ? slide.texto : slide.texto_original;
  const prompt = slide.prompt;

  return (
    <div
      style={{
        background: "#111",
        border: "1px solid #1e4040",
        borderLeft: `3px solid ${funcaoColors[funcao] || "#2a5a5a"}`,
        borderRadius: "8px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle background glow */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: "1px",
        background: `linear-gradient(90deg, transparent, ${funcaoColors[funcao] || "#2a5a5a"}44, transparent)`,
      }} />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{
          width: "28px", height: "28px",
          background: "#0a1a1a",
          border: `1px solid ${funcaoColors[funcao] || "#2a5a5a"}`,
          borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "11px",
          color: funcaoColors[funcao] || "#d4a43a",
          fontFamily: "'Courier New', monospace",
          fontWeight: "bold",
          flexShrink: 0,
        }}>
          {slide.numero}
        </div>
        <span style={{
          fontSize: "11px",
          color: funcaoColors[funcao] || "#d4a43a",
          fontFamily: "'Courier New', monospace",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          fontWeight: "bold",
        }}>
          {funcao}
        </span>
      </div>

      {/* Texto PT */}
      <div style={{
        background: "#0d1a1a",
        border: "1px solid #1e3535",
        borderRadius: "6px",
        padding: "14px 16px",
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}>
          <span style={{
            fontSize: "9px",
            color: "#4a7a7a",
            fontFamily: "'Courier New', monospace",
            letterSpacing: "0.1em",
          }}>TEXTO · PT-BR</span>
          <CopyButton text={texto} />
        </div>
        <p style={{
          margin: 0,
          color: "#e8e8e0",
          fontSize: "14px",
          lineHeight: "1.7",
          fontFamily: "'Georgia', serif",
        }}>{texto}</p>
      </div>

      {/* Prompt EN */}
      <div style={{
        background: "#0a1010",
        border: "1px solid #152020",
        borderRadius: "6px",
        padding: "14px 16px",
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}>
          <span style={{
            fontSize: "9px",
            color: "#3a6060",
            fontFamily: "'Courier New', monospace",
            letterSpacing: "0.1em",
          }}>PROMPT · LEONARDO AI</span>
          <CopyButton text={prompt} />
        </div>
        <p style={{
          margin: 0,
          color: "#8ab0a8",
          fontSize: "12px",
          lineHeight: "1.65",
          fontFamily: "'Courier New', monospace",
        }}>{prompt}</p>
      </div>
    </div>
  );
}

function LegendaCard({ legenda }) {
  return (
    <div style={{
      background: "#0f1a12",
      border: "1px solid #2a4a2a",
      borderLeft: "3px solid #4a7a4a",
      borderRadius: "8px",
      padding: "20px",
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "14px",
      }}>
        <span style={{
          fontSize: "10px",
          color: "#6a9a6a",
          fontFamily: "'Courier New', monospace",
          letterSpacing: "0.12em",
        }}>LEGENDA DO POST</span>
        <CopyButton text={legenda} />
      </div>
      <p style={{
        margin: 0,
        color: "#c8e0c8",
        fontSize: "14px",
        lineHeight: "1.8",
        fontFamily: "'Georgia', serif",
        whiteSpace: "pre-wrap",
      }}>{legenda}</p>
    </div>
  );
}

function LoadingState() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "60px 20px",
      gap: "20px",
    }}>
      <div style={{
        display: "flex",
        gap: "8px",
      }}>
        {[0,1,2,3,4].map(i => (
          <div key={i} style={{
            width: "6px",
            height: "6px",
            background: "#2a5a5a",
            borderRadius: "50%",
            animation: `pulse 1.4s ease-in-out ${i * 0.15}s infinite`,
          }} />
        ))}
      </div>
      <p style={{
        margin: 0,
        color: "#4a7a7a",
        fontSize: "12px",
        fontFamily: "'Courier New', monospace",
        letterSpacing: "0.15em",
      }}>GERANDO CARROSSEL...</p>
      <style>{`
        @keyframes pulse {
          0%, 80%, 100% { opacity: 0.2; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1.2); background: #d4a43a; }
        }
      `}</style>
    </div>
  );
}

export default function DravtusApp() {
  const [mode, setMode] = useState("tema");
  const [tema, setTema] = useState("");
  const [roteiro, setRoteiro] = useState(["", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const updateRoteiro = (i, val) => {
    const next = [...roteiro];
    next[i] = val;
    setRoteiro(next);
  };

  const extractJSON = (text) => {
    // Try direct parse
    try { return JSON.parse(text); } catch {}
    // Try extracting from markdown block
    const match = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (match) {
      try { return JSON.parse(match[1].trim()); } catch {}
    }
    // Try finding raw JSON object
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start !== -1 && end !== -1) {
      try { return JSON.parse(text.slice(start, end + 1)); } catch {}
    }
    return null;
  };

  const handleGenerate = async () => {
    setError(null);
    setResult(null);
    setLoading(true);

    try {
      let userMessage = "";
      let systemPrompt = "";

      if (mode === "tema") {
        if (!tema.trim()) { setError("Digite um tema para gerar o carrossel."); setLoading(false); return; }
        systemPrompt = SYSTEM_TEMA;
        userMessage = `Tema: ${tema.trim()}`;
      } else {
        const filled = roteiro.map(t => t.trim());
        if (filled.some(t => !t)) { setError("Preencha todos os 5 slides para usar o Modo Roteiro."); setLoading(false); return; }
        systemPrompt = SYSTEM_ROTEIRO;
        userMessage = filled.map((t, i) => `Slide ${i+1}: ${t}`).join("\n\n");
      }

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: systemPrompt,
          messages: [{ role: "user", content: userMessage }],
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || "Erro na API");

      const raw = data.content?.map(b => b.text || "").join("") || "";
      const parsed = extractJSON(raw);

      if (!parsed) throw new Error("Resposta da IA não pôde ser interpretada como JSON.");

      setResult({ parsed, mode });
    } catch (e) {
      setError(e.message || "Erro desconhecido. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const slides = result?.parsed?.slides || [];
  const legenda = result?.parsed?.legenda;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      color: "#e0e0d8",
      fontFamily: "'Georgia', serif",
      padding: "0",
    }}>
      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #1e4040; border-radius: 2px; }
        textarea:focus, input:focus { outline: none !important; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .slide-card { animation: fadeIn 0.4s ease forwards; }
        .glow-btn:hover { background: #1e4a4a !important; border-color: #3a8080 !important; }
        .mode-btn:hover { background: #141a1a !important; }
      `}</style>

      {/* Header */}
      <div style={{
        borderBottom: "1px solid #141414",
        padding: "24px 32px 20px",
        background: "linear-gradient(180deg, #0d1414 0%, #0a0a0a 100%)",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          {/* Wordmark */}
          <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "18px" }}>
            <span style={{
              fontSize: "20px",
              letterSpacing: "0.25em",
              color: "#d4a43a",
              fontFamily: "'Courier New', monospace",
              fontWeight: "bold",
            }}>DRAVTUS</span>
            <span style={{
              fontSize: "11px",
              color: "#3a6060",
              fontFamily: "'Courier New', monospace",
              letterSpacing: "0.1em",
            }}>/ CAROUSEL FORGE</span>
          </div>

          {/* Mode Toggle */}
          <div style={{
            display: "inline-flex",
            background: "#0d1414",
            border: "1px solid #1e3535",
            borderRadius: "6px",
            padding: "3px",
            gap: "2px",
          }}>
            {[
              { id: "tema", label: "MODO TEMA" },
              { id: "roteiro", label: "MODO ROTEIRO" },
            ].map(m => (
              <button
                key={m.id}
                className="mode-btn"
                onClick={() => { setMode(m.id); setResult(null); setError(null); }}
                style={{
                  background: mode === m.id ? "#1e4040" : "transparent",
                  border: mode === m.id ? "1px solid #2a5a5a" : "1px solid transparent",
                  color: mode === m.id ? "#7ab8b8" : "#3a6060",
                  padding: "7px 18px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "10px",
                  fontFamily: "'Courier New', monospace",
                  letterSpacing: "0.12em",
                  transition: "all 0.2s ease",
                }}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "28px 24px 60px" }}>

        {/* Input area */}
        <div style={{
          background: "#0f1414",
          border: "1px solid #1a3030",
          borderRadius: "10px",
          padding: "22px",
          marginBottom: "28px",
        }}>
          {mode === "tema" ? (
            <div>
              <label style={{
                display: "block",
                fontSize: "9px",
                color: "#4a7a7a",
                fontFamily: "'Courier New', monospace",
                letterSpacing: "0.15em",
                marginBottom: "10px",
              }}>TEMA DO CARROSSEL</label>
              <textarea
                value={tema}
                onChange={e => setTema(e.target.value)}
                placeholder="Ex: o paradoxo da liberdade moderna, por que mais opções geram menos sentido..."
                rows={3}
                style={{
                  width: "100%",
                  background: "#0a1010",
                  border: "1px solid #1e3535",
                  borderRadius: "6px",
                  color: "#e0e0d8",
                  padding: "12px 14px",
                  fontSize: "14px",
                  lineHeight: "1.6",
                  fontFamily: "'Georgia', serif",
                  resize: "vertical",
                  transition: "border-color 0.2s",
                }}
                onFocus={e => e.target.style.borderColor = "#2a5a5a"}
                onBlur={e => e.target.style.borderColor = "#1e3535"}
              />
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <label style={{
                fontSize: "9px",
                color: "#4a7a7a",
                fontFamily: "'Courier New', monospace",
                letterSpacing: "0.15em",
              }}>TEXTOS DOS 5 SLIDES</label>
              {["Gancho", "O que se assume", "Virada filosófica", "Aplicação", "Síntese"].map((fn, i) => (
                <div key={i}>
                  <div style={{
                    fontSize: "9px",
                    color: ["#e05c2a","#c4852a","#d4a43a","#a8c060","#4a9a9a"][i],
                    fontFamily: "'Courier New', monospace",
                    letterSpacing: "0.1em",
                    marginBottom: "6px",
                  }}>SLIDE {i+1} — {fn.toUpperCase()}</div>
                  <textarea
                    value={roteiro[i]}
                    onChange={e => updateRoteiro(i, e.target.value)}
                    placeholder={`Texto do slide ${i+1}...`}
                    rows={2}
                    style={{
                      width: "100%",
                      background: "#0a1010",
                      border: "1px solid #1e3535",
                      borderRadius: "6px",
                      color: "#e0e0d8",
                      padding: "10px 14px",
                      fontSize: "13px",
                      lineHeight: "1.6",
                      fontFamily: "'Georgia', serif",
                      resize: "vertical",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={e => e.target.style.borderColor = "#2a5a5a"}
                    onBlur={e => e.target.style.borderColor = "#1e3535"}
                  />
                </div>
              ))}
            </div>
          )}

          <button
            className="glow-btn"
            onClick={handleGenerate}
            disabled={loading}
            style={{
              marginTop: "18px",
              width: "100%",
              background: loading ? "#0d1a1a" : "#162828",
              border: "1px solid #2a5a5a",
              color: loading ? "#3a6060" : "#7ab8b8",
              padding: "13px 24px",
              borderRadius: "6px",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "11px",
              fontFamily: "'Courier New', monospace",
              letterSpacing: "0.2em",
              transition: "all 0.2s ease",
            }}
          >
            {loading ? "PROCESSANDO..." : "⬡ GERAR CARROSSEL"}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: "#1a0808",
            border: "1px solid #4a1a1a",
            borderRadius: "8px",
            padding: "16px 20px",
            marginBottom: "24px",
            color: "#c07070",
            fontSize: "13px",
            fontFamily: "'Courier New', monospace",
          }}>
            ⚠ {error}
          </div>
        )}

        {/* Loading */}
        {loading && <LoadingState />}

        {/* Results */}
        {!loading && slides.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {result?.parsed?.tema && (
              <div style={{
                padding: "10px 16px",
                background: "#0d1a1a",
                border: "1px solid #1e3535",
                borderRadius: "6px",
                fontSize: "11px",
                color: "#4a7a7a",
                fontFamily: "'Courier New', monospace",
                letterSpacing: "0.08em",
              }}>
                TEMA: <span style={{ color: "#d4a43a" }}>{result.parsed.tema}</span>
              </div>
            )}

            {slides.map((slide, i) => (
              <div key={i} className="slide-card" style={{ animationDelay: `${i * 0.08}s` }}>
                <SlideCard slide={slide} index={i} mode={result.mode} />
              </div>
            ))}

            {legenda && (
              <div className="slide-card" style={{ animationDelay: "0.45s" }}>
                <LegendaCard legenda={legenda} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
