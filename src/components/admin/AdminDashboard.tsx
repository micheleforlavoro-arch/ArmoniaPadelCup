import React, { useState, useEffect } from "react";

import { motion, AnimatePresence } from "motion/react";

import {
  Loader2,
  Trash2,
  Edit3,
  ShieldCheck,
  X,
  ArrowRight,
  Trophy,
  Dices,
} from "lucide-react";

import { Registration, TournamentState, Article } from "../../lib/types";

import { ACCENT_COLOR, compressImage } from "../../lib/constants";

export const AdminDashboard = ({
  registrations,
  onUpdateStatus,
  onUpdateBracket,
  onRefresh,
  tournamentState,
  onAddRegistration,
  onUpdateRegistration,
  articles,
  onAddArticle,
  onUpdateArticle,
  onDeleteArticle,
}: {
  registrations: Registration[];
  onUpdateStatus: (id: string, status: "accepted" | "rejected") => void;
  onUpdateBracket: (newBracket: any) => void;
  onRefresh: () => void;
  tournamentState: TournamentState;
  onAddRegistration: (
    newReg: Omit<Registration, "id" | "created_at">,
  ) => Promise<boolean>;
  onUpdateRegistration: (
    id: string,
    updatedFields: Partial<Registration>,
  ) => Promise<boolean>;
  articles: Article[];
  onAddArticle: (
    newArt: Omit<Article, "id" | "created_at">,
  ) => Promise<boolean>;
  onUpdateArticle: (
    id: string,
    updatedFields: Partial<Article>,
  ) => Promise<boolean>;
  onDeleteArticle: (id: string) => Promise<boolean>;
}) => {
  const acceptedCount = registrations.filter(
    (r) => r.status === "accepted",
  ).length;
  const [editingBracket, setEditingBracket] = useState<any>(null);
  const [viewMode, setViewMode] = useState<
    "iscrizioni" | "tabellone" | "articoli"
  >("iscrizioni");
  const [isAdding, setIsAdding] = useState(false);
  const [editingReg, setEditingReg] = useState<Registration | null>(null);
  // Article management states
  const [isWritingArticle, setIsWritingArticle] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [articleTitle, setArticleTitle] = useState("");
  const [articleGiornata, setArticleGiornata] = useState("");
  const [articleContent, setArticleContent] = useState("");
  // Form states
  const [teamName, setTeamName] = useState('');
  const [p1Name, setP1Name] = useState("");
  const [p1Surname, setP1Surname] = useState("");
  const [p2Name, setP2Name] = useState("");
  const [p2Surname, setP2Surname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [level, setLevel] = useState("principiante");
  const [payment, setPayment] = useState("contanti");
  const [status, setStatus] = useState<"pending" | "accepted" | "rejected">(
    "accepted",
  );
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    if (tournamentState.bracket) {
      setEditingBracket(tournamentState.bracket);
    } else {
      setEditingBracket(null);
    }
  }, [tournamentState]);
  useEffect(() => {
    if (editingReg) {
      setTeamName(editingReg.team_name || "");
      setP1Name(editingReg.p1_name || "");
      setP1Surname(editingReg.p1_surname || "");
      setP2Name(editingReg.p2_name || "");
      setP2Surname(editingReg.p2_surname || "");
      setEmail(editingReg.email || "");
      setPhone(editingReg.phone || "");
      setLevel(editingReg.level || "principiante");
      setPayment(editingReg.payment || "contanti");
      setStatus(editingReg.status || "accepted");
      setImageUrl(editingReg.image_url || "");
    } else {
      resetForm();
    }
  }, [editingReg]);
  const resetForm = () => {
    setTeamName("");
    setP1Name("");
    setP1Surname("");
    setP2Name("");
    setP2Surname("");
    setEmail("");
    setPhone("");
    setLevel("principiante");
    setPayment("contanti");
    setStatus("accepted");
    setImageUrl("");
  };
  const resetArticleForm = () => {
    setArticleTitle("");
    setArticleGiornata("");
    setArticleContent("");
  };
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const compressed = await compressImage(reader.result as string);
        setImageUrl(compressed);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      team_name: teamName,
      p1_name: p1Name,
      p1_surname: p1Surname,
      p2_name: p2Name,
      p2_surname: p2Surname,
      email,
      phone,
      level,
      payment,
      status,
      image_url: imageUrl,
    };
    if (editingReg) {
      const success = await onUpdateRegistration(editingReg.id, data);
      if (success) {
        setEditingReg(null);
      }
    } else {
      const success = await onAddRegistration(data);
      if (success) {
        setIsAdding(false);
        resetForm();
      }
    }
  };
  const handleArticleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      title: articleTitle,
      giornata: articleGiornata,
      content: articleContent,
    };
    if (editingArticle) {
      const success = await onUpdateArticle(editingArticle.id, data);
      if (success) {
        setEditingArticle(null);
        resetArticleForm();
      }
    } else {
      const success = await onAddArticle(data);
      if (success) {
        setIsWritingArticle(false);
        resetArticleForm();
      }
    }
  };
  const advanceTeam = (
    teamName: string,
    round: "ottavi" | "quarterFinals" | "semiFinals" | "final" | "finalissima",
    index: number,
  ) => {
    if (!teamName || !editingBracket) return;
    const newBracket = {
      ...editingBracket,
    };
    if (round === "ottavi") {
      if (!newBracket.quarterFinals)
        newBracket.quarterFinals = Array(8).fill("");
      newBracket.quarterFinals[index] = teamName;
    } else if (round === "quarterFinals") {
      if (!newBracket.semiFinals) newBracket.semiFinals = Array(4).fill("");
      newBracket.semiFinals[index] = teamName;
    } else if (round === "semiFinals") {
      if (!newBracket.final) newBracket.final = Array(2).fill("");
      newBracket.final[index] = teamName;
    } else if (round === "final") {
      if (!newBracket.finalissima) newBracket.finalissima = Array(2).fill("");
      newBracket.finalissima[index] = teamName;
    } else if (round === "finalissima") {
      newBracket.winner = teamName;
    }
    setEditingBracket(newBracket);
  };
  const updateTeamName = (round: string, index: number, value: string) => {
    if (!editingBracket) return;
    const newBracket = {
      ...editingBracket,
    };
    if (!newBracket[round]) newBracket[round] = [];
    newBracket[round][index] = value;
    setEditingBracket(newBracket);
  };
  return (
    <div className="space-y-12">
      {" "}
      {/* Tabs and Header */}
      <div className="flex flex-col gap-6">
        {" "}
        <div>
          {" "}
          <h2 className="text-4xl font-black italic uppercase tracking-tighter">
            Area Organizzatori.
          </h2>{" "}
          <p className="text-white/40 text-xs uppercase tracking-widest mt-2">
            {" "}
            Pannello di controllo per la gestione del torneo{" "}
          </p>{" "}
        </div>{" "}
        {/* Navigation Tabs */}
        <div className="flex border-b border-white/10 gap-8 overflow-x-auto pb-1">
          {" "}
          <button
            onClick={() => {
              setViewMode("iscrizioni");
              setIsAdding(false);
              setEditingReg(null);
              setIsWritingArticle(false);
              setEditingArticle(null);
            }}
            className={`pb-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all cursor-pointer ${
              viewMode === "iscrizioni"
                ? "text-[#A5D8FF] border-[#A5D8FF]"
                : "text-white/40 border-transparent hover:text-white"
            }
`}
          >
            {" "}
            Iscrizioni ({registrations.length}){" "}
          </button>{" "}
          <button
            onClick={() => {
              setViewMode("tabellone");
              setIsAdding(false);
              setEditingReg(null);
              setIsWritingArticle(false);
              setEditingArticle(null);
            }}
            className={`pb-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all cursor-pointer ${
              viewMode === "tabellone"
                ? "text-[#A5D8FF] border-[#A5D8FF]"
                : "text-white/40 border-transparent hover:text-white"
            }
`}
          >
            {" "}
            Tabellone{" "}
          </button>{" "}
          <button
            onClick={() => {
              setViewMode("articoli");
              setIsAdding(false);
              setEditingReg(null);
              setIsWritingArticle(false);
              setEditingArticle(null);
            }}
            className={`pb-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all cursor-pointer ${
              viewMode === "articoli"
                ? "text-[#A5D8FF] border-[#A5D8FF]"
                : "text-white/40 border-transparent hover:text-white"
            }
`}
          >
            {" "}
            Gestione Articoli ({articles.length}){" "}
          </button>{" "}
        </div>{" "}
        {/* View Action Buttons */}
        <div className="flex flex-wrap gap-4 items-center justify-between">
          {" "}
          <div>
            {" "}
            {viewMode === "iscrizioni" && (
              <div className="flex items-center gap-4">
                {" "}
                <button
                  onClick={onRefresh}
                  className="text-[#A5D8FF] text-[10px] font-bold uppercase tracking-widest hover:underline flex items-center gap-1"
                >
                  {" "}
                  <Loader2
                    size={10}
                    className={registrations.length === 0 ? "animate-spin" : ""}
                  />{" "}
                  Aggiorna Lista{" "}
                </button>{" "}
                <button
                  onClick={() => {
                    setIsAdding(!isAdding);
                    setEditingReg(null);
                  }}
                  className="text-green-400 text-[10px] font-bold uppercase tracking-widest hover:underline flex items-center gap-1"
                >
                  {" "}
                  + Aggiungi Coppia{" "}
                </button>{" "}
              </div>
            )}
            {viewMode === "tabellone" && (
              <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">
                {" "}
                Gestione accoppiamenti e turni delle finali{" "}
              </p>
            )}
            {viewMode === "articoli" && (
              <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">
                {" "}
                Pubblica e modifica le news del torneo{" "}
              </p>
            )}
          </div>{" "}
          <div className="flex gap-4">
            {" "}
            {viewMode === "tabellone" && (
              <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Modifiche live</p>
            )}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      {/* Form Aggiungi / Modifica Coppia */}
      {(isAdding || editingReg) && (
        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="bg-white/[0.02] border border-[#A5D8FF]/20 rounded-[32px] p-8 space-y-6"
        >
          {" "}
          <div className="flex justify-between items-center border-b border-white/5 pb-4">
            {" "}
            <h3 className="text-xl font-black italic uppercase text-[#A5D8FF]">
              {" "}
              {editingReg ? "Modifica Iscrizione" : "Aggiungi Nuova Coppia"}
            </h3>{" "}
            <button
              onClick={() => {
                setIsAdding(false);
                setEditingReg(null);
              }}
              className="text-white/40 hover:text-white text-xs uppercase font-bold tracking-widest"
            >
              {" "}
              Annulla{" "}
            </button>{" "}
          </div>{" "}
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
            {" "}
            <div>
              {" "}
              <label className="block text-[10px] uppercase font-bold text-white/30 ml-2 mb-2 tracking-[0.2em]">
                Foto della coppia
              </label>{" "}
              <div className="flex gap-4 items-center">
                {" "}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="block w-full text-xs text-white/40 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20"
                />{" "}
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt="Anteprima"
                    className="w-12 h-12 rounded-xl object-cover border border-white/20"
                  />
                )}
              </div>{" "}
            </div>{" "}
            <div className="space-y-4">
              {" "}
              <div>
                {" "}
                <label className="block text-[10px] uppercase font-bold text-white/30 ml-2 mb-2 tracking-[0.2em]">
                  Giocatore 1
                </label>{" "}
                <div className="grid grid-cols-2 gap-3">
                  {" "}
                  <input
                    value={p1Name}
                    onChange={(e) => setP1Name(e.target.value)}
                    type="text"
                    required
                    placeholder="Nome"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#A5D8FF]"
                  />{" "}
                  <input
                    value={p1Surname}
                    onChange={(e) => setP1Surname(e.target.value)}
                    type="text"
                    required
                    placeholder="Cognome"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#A5D8FF]"
                  />{" "}
                </div>{" "}
              </div>{" "}
              <div>
                {" "}
                <label className="block text-[10px] uppercase font-bold text-white/30 ml-2 mb-2 tracking-[0.2em]">
                  Email
                </label>{" "}
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  placeholder="mail@esempio.it"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#A5D8FF]"
                />{" "}
              </div>{" "}
            </div>{" "}
            <div className="space-y-4">
              {" "}
              <div>
                {" "}
                <label className="block text-[10px] uppercase font-bold text-white/30 ml-2 mb-2 tracking-[0.2em]">
                  Giocatore 2
                </label>{" "}
                <div className="grid grid-cols-2 gap-3">
                  {" "}
                  <input
                    value={p2Name}
                    onChange={(e) => setP2Name(e.target.value)}
                    type="text"
                    required
                    placeholder="Nome"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#A5D8FF]"
                  />{" "}
                  <input
                    value={p2Surname}
                    onChange={(e) => setP2Surname(e.target.value)}
                    type="text"
                    required
                    placeholder="Cognome"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#A5D8FF]"
                  />{" "}
                </div>{" "}
              </div>{" "}
              <div>
                {" "}
                <label className="block text-[10px] uppercase font-bold text-white/30 ml-2 mb-2 tracking-[0.2em]">
                  Telefono
                </label>{" "}
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  required
                  placeholder="+39 ..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#A5D8FF]"
                />{" "}
              </div>{" "}
            </div>{" "}
            <div className="grid grid-cols-1 gap-4 col-span-2">
              {" "}
              <div>
                {" "}
                <label className="block text-[10px] uppercase font-bold text-white/30 ml-2 mb-2 tracking-[0.2em]">
                  Stato
                </label>{" "}
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#A5D8FF] appearance-none cursor-pointer"
                >
                  {" "}
                  <option value="pending" className="bg-[#050505]">
                    Pending
                  </option>{" "}
                  <option value="accepted" className="bg-[#050505]">
                    Accepted
                  </option>{" "}
                  <option value="rejected" className="bg-[#050505]">
                    Rejected
                  </option>{" "}
                </select>{" "}
              </div>{" "}
            </div>{" "}
            <button
              type="submit"
              className="col-span-2 mt-4 py-4 bg-[#A5D8FF] text-black font-black uppercase tracking-[0.3em] text-xs rounded-xl hover:bg-white transition-all transform active:scale-[0.98] shadow-2xl flex items-center justify-center gap-2 cursor-pointer"
            >
              {" "}
              {editingReg ? "Salva Modifiche" : "Crea Coppia"}
            </button>{" "}
          </form>{" "}
        </motion.div>
      )}
      {viewMode === "tabellone" &&
        editingBracket && (
          <div className="bg-white/[0.02] border border-[#A5D8FF]/20 rounded-[32px] p-8 space-y-8">
            {" "}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-4">
              {" "}
              <h3 className="text-xl font-black italic uppercase text-[#A5D8FF]">
                Modifica Tabellone
              </h3>{" "}
              <button
                type="button"
                onClick={() => onUpdateBracket(editingBracket)}
                className="px-6 py-2 bg-[#A5D8FF] text-black rounded-lg text-xs font-black uppercase tracking-widest transition-colors hover:bg-white"
              >
                {" "}
                Salva Modifiche{" "}
              </button>{" "}
            </div>{" "}
            {/* Gironi Edit */}
            <div className="space-y-4 border-b border-white/5 pb-8">
              {" "}
              <h4 className="text-sm font-bold uppercase tracking-widest text-[#A5D8FF]">
                Modifica Gironi (24 Squadre)
              </h4>{" "}
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {" "}
                {["A", "B", "C", "D", "E", "F"].map((gName) => (
                  <div
                    key={gName}
                    className="p-4 bg-black/40 rounded-xl border border-white/5 space-y-3"
                  >
                    {" "}
                    <div className="font-bold text-xs uppercase text-[#A5D8FF]">
                      Girone {gName}
                    </div>{" "}
                    <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1">Squadre</div>
                    {[0, 1, 2, 3].map((idx) => (
                      <input
                        key={`team-${idx}`}
                        type="text"
                        value={editingBracket.gironi?.[gName]?.[idx] || ""}
                        onChange={(e) => {
                          const newBracket = {
                            ...editingBracket,
                          };
                          if (!newBracket.gironi) newBracket.gironi = {};
                          if (!newBracket.gironi[gName] || newBracket.gironi[gName].length < 10)
                            newBracket.gironi[gName] = [...(newBracket.gironi[gName] || []), ...Array(10)].slice(0, 10);
                          newBracket.gironi[gName][idx] = e.target.value;
                          setEditingBracket(newBracket);
                        }}
                        placeholder={`Squadra ${idx + 1}`}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-[#A5D8FF]"
                      />
                    ))}
                    <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold mt-4 mb-1 border-t border-white/5 pt-3">Partite & Punteggi</div>
                    {[4, 5, 6, 7, 8, 9].map((idx) => {
                      const val = editingBracket.gironi?.[gName]?.[idx] || "";
                      const valStr = val || "";
                      const parts = valStr.includes('|') ? valStr.split('|') : [valStr, "", "", ""];
                      const updatePart = (partIdx: number, text: string) => {
                        const newParts = [...parts];
                        newParts[partIdx] = text;
                        // Ensure parts array has at least 4 elements
                        while (newParts.length < 4) newParts.push("");
                        const newBracket = { ...editingBracket };
                        if (!newBracket.gironi) newBracket.gironi = {};
                        if (!newBracket.gironi[gName] || newBracket.gironi[gName].length < 10)
                          newBracket.gironi[gName] = [...(newBracket.gironi[gName] || []), ...Array(10)].slice(0, 10);
                        newBracket.gironi[gName][idx] = newParts.join('|');
                        setEditingBracket(newBracket);
                      };
                      return (
                        <div key={`match-${idx}`} className="flex flex-col gap-1 mb-2">
                          <input type="text" value={parts[3] || ""} onChange={(e) => updatePart(3, e.target.value)} placeholder="Data e Orario (es. 20 Mag 15:00)" className="w-full bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-[10px] focus:outline-none focus:border-white text-white/70" />
                          <div className="flex gap-1 items-center">
                            <input type="text" value={parts[0] || ""} onChange={(e) => updatePart(0, e.target.value)} placeholder="Sq. 1" className="flex-1 bg-[#A5D8FF]/5 border border-[#A5D8FF]/20 rounded-lg px-2 py-1.5 text-[10px] focus:outline-none focus:border-[#A5D8FF] text-[#A5D8FF]" />
                            <span className="text-[#A5D8FF]/30 text-[10px] font-black italic">vs</span>
                            <input type="text" value={parts[1] || ""} onChange={(e) => updatePart(1, e.target.value)} placeholder="Sq. 2" className="flex-1 bg-[#A5D8FF]/5 border border-[#A5D8FF]/20 rounded-lg px-2 py-1.5 text-[10px] focus:outline-none focus:border-[#A5D8FF] text-[#A5D8FF]" />
                            <input type="text" value={parts[2] || ""} onChange={(e) => updatePart(2, e.target.value)} placeholder="Pt." className="w-[40px] bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-[10px] focus:outline-none focus:border-white text-white font-bold text-center" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>{" "}
            </div>{" "}
            {/* Ottavi Edit */}
            <div className="space-y-4 border-b border-white/5 pb-8">
              {" "}
              <h4 className="text-sm font-bold uppercase tracking-widest text-[#A5D8FF]">
                Ottavi di Finale (16 Squadre)
              </h4>{" "}
              <div className="grid md:grid-cols-2 gap-4">
                {" "}
                {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <div
                    key={i}
                    className="p-4 bg-black/40 rounded-xl border border-white/5 space-y-3"
                  >
                    {" "}
                    <div className="text-xs font-bold text-white/30 uppercase">
                      Match #{i + 1}
                    </div>{" "}
                    {[0, 1].map((j) => {
                      const team = editingBracket.ottavi?.[i * 2 + j] || "";
                      const parts = team.split('|');
                      const teamName = parts[0] || "";
                      const score = parts[1] || "";
                      const dateTime = parts[2] || "";
                      const court = parts[3] || "";

                      const updateVal = (idx: number, newVal: string) => {
                        const newBracket = { ...editingBracket };
                        if (!newBracket.ottavi) newBracket.ottavi = Array(16).fill("");
                        const currentParts = [teamName, score, dateTime, court];
                        currentParts[idx] = newVal;
                        newBracket.ottavi[i * 2 + j] = currentParts.join('|');
                        setEditingBracket(newBracket);
                      };

                      return (
                        <div key={j} className="space-y-1.5 p-2 bg-white/5 rounded-lg border border-white/5">
                          <div className="flex gap-2 items-center">
                            <input
                              type="text"
                              value={teamName}
                              onChange={(e) => updateVal(0, e.target.value)}
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-xs focus:outline-none focus:border-[#A5D8FF]"
                              placeholder="Squadra"
                            />
                            <input
                              type="text"
                              value={score}
                              onChange={(e) => updateVal(1, e.target.value)}
                              className="w-12 bg-white/5 border border-white/10 rounded-lg px-1 py-1 text-xs text-center focus:outline-none focus:border-[#A5D8FF]"
                              placeholder="Pt."
                            />
                            {j === 0 && (
                              <button
                                type="button"
                                onClick={() => advanceTeam(teamName, "ottavi", i)}
                                disabled={!teamName}
                                className="px-2 py-1 bg-green-500/20 text-green-400 rounded hover:bg-green-500 hover:text-white disabled:opacity-30 transition-colors"
                                title="Avanza ai Quarti (Sq 1)"
                              >
                                <ArrowRight size={12} />
                              </button>
                            )}
                            {j === 1 && (
                              <button
                                type="button"
                                onClick={() => advanceTeam(teamName, "ottavi", i)}
                                disabled={!teamName}
                                className="px-2 py-1 bg-green-500/20 text-green-400 rounded hover:bg-green-500 hover:text-white disabled:opacity-30 transition-colors"
                                title="Avanza ai Quarti (Sq 2)"
                              >
                                <ArrowRight size={12} />
                              </button>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={dateTime}
                              onChange={(e) => updateVal(2, e.target.value)}
                              className="w-1/2 bg-[#A5D8FF]/5 border border-[#A5D8FF]/20 rounded px-2 py-0.5 text-[10px] focus:outline-none focus:border-[#A5D8FF] text-[#A5D8FF]"
                              placeholder="Data/Ora"
                            />
                            <input
                              type="text"
                              value={court}
                              onChange={(e) => updateVal(3, e.target.value)}
                              className="w-1/2 bg-[#A5D8FF]/5 border border-[#A5D8FF]/20 rounded px-2 py-0.5 text-[10px] focus:outline-none focus:border-[#A5D8FF] text-[#A5D8FF]"
                              placeholder="Campo"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>{" "}
            </div>{" "}
            {/* Quarti, Semifinali, Finale Edit */}
            <div className="grid md:grid-cols-3 gap-8">
              {" "}
              {/* Quarti */}
              <div className="space-y-4">
                {" "}
                <div className="text-xs font-bold uppercase text-[#A5D8FF]">
                  Quarti di Finale
                </div>{" "}
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-2"
                  >
                    {" "}
                    <div className="text-[8px] font-bold text-white/20 uppercase">
                      Match #{i + 1}
                    </div>{" "}
                    {[0, 1].map((j) => {
                      const team = editingBracket.quarterFinals?.[i * 2 + j] || "";
                      const parts = team.split('|');
                      const teamName = parts[0] || "";
                      const score = parts[1] || "";
                      const dateTime = parts[2] || "";
                      const court = parts[3] || "";

                      const updateVal = (idx: number, newVal: string) => {
                        const newBracket = { ...editingBracket };
                        if (!newBracket.quarterFinals) newBracket.quarterFinals = Array(8).fill("");
                        const currentParts = [teamName, score, dateTime, court];
                        currentParts[idx] = newVal;
                        newBracket.quarterFinals[i * 2 + j] = currentParts.join('|');
                        setEditingBracket(newBracket);
                      };

                      return (
                        <div key={j} className="space-y-1.5 p-2 bg-white/5 rounded-lg border border-white/5">
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={teamName}
                              onChange={(e) => updateVal(0, e.target.value)}
                              className="w-full bg-white/5 px-2 py-1 rounded text-xs focus:outline-none focus:border-[#A5D8FF] border border-transparent"
                              placeholder="TBD"
                            />
                            <input
                              type="text"
                              value={score}
                              onChange={(e) => updateVal(1, e.target.value)}
                              className="w-10 bg-white/5 px-1 py-1 rounded text-xs text-center focus:outline-none focus:border-[#A5D8FF] border border-transparent"
                              placeholder="Pt."
                            />
                            <button
                              type="button"
                              onClick={() => advanceTeam(teamName, "quarterFinals", i)}
                              disabled={!teamName}
                              className="px-1.5 py-1 bg-green-500/20 text-green-400 rounded hover:bg-green-500 hover:text-white disabled:opacity-30 transition-colors"
                              title="Avanza alle Semifinali"
                            >
                              <ArrowRight size={11} />
                            </button>
                          </div>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={dateTime}
                              onChange={(e) => updateVal(2, e.target.value)}
                              className="w-1/2 bg-[#A5D8FF]/5 border border-[#A5D8FF]/20 rounded px-1.5 py-0.5 text-[9px] focus:outline-none"
                              placeholder="Data/Ora"
                            />
                            <input
                              type="text"
                              value={court}
                              onChange={(e) => updateVal(3, e.target.value)}
                              className="w-1/2 bg-[#A5D8FF]/5 border border-[#A5D8FF]/20 rounded px-1.5 py-0.5 text-[9px] focus:outline-none"
                              placeholder="Campo"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>{" "}
              {/* Semifinali */}
              <div className="space-y-4">
                {" "}
                <div className="text-xs font-bold uppercase text-[#A5D8FF]">
                  Semifinali
                </div>{" "}
                {[0, 1].map((i) => (
                  <div
                    key={i}
                    className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-2"
                  >
                    {" "}
                    <div className="text-[8px] font-bold text-white/20 uppercase">
                      Match #{i + 1}
                    </div>{" "}
                    {[0, 1].map((j) => {
                      const team = editingBracket.semiFinals?.[i * 2 + j] || "";
                      const parts = team.split('|');
                      const teamName = parts[0] || "";
                      const score = parts[1] || "";
                      const dateTime = parts[2] || "";
                      const court = parts[3] || "";

                      const updateVal = (idx: number, newVal: string) => {
                        const newBracket = { ...editingBracket };
                        if (!newBracket.semiFinals) newBracket.semiFinals = Array(4).fill("");
                        const currentParts = [teamName, score, dateTime, court];
                        currentParts[idx] = newVal;
                        newBracket.semiFinals[i * 2 + j] = currentParts.join('|');
                        setEditingBracket(newBracket);
                      };

                      return (
                        <div key={j} className="space-y-1.5 p-2 bg-white/5 rounded-lg border border-white/5">
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={teamName}
                              onChange={(e) => updateVal(0, e.target.value)}
                              className="w-full bg-white/5 px-2 py-1 rounded text-xs focus:outline-none focus:border-[#A5D8FF] border border-transparent"
                              placeholder="TBD"
                            />
                            <input
                              type="text"
                              value={score}
                              onChange={(e) => updateVal(1, e.target.value)}
                              className="w-10 bg-white/5 px-1 py-1 rounded text-xs text-center focus:outline-none focus:border-[#A5D8FF] border border-transparent"
                              placeholder="Pt."
                            />
                            <button
                              type="button"
                              onClick={() => advanceTeam(teamName, "semiFinals", i)}
                              disabled={!teamName}
                              className="px-1.5 py-1 bg-green-500/20 text-green-400 rounded hover:bg-green-500 hover:text-white disabled:opacity-30 transition-colors"
                              title="Avanza alla Finale"
                            >
                              <ArrowRight size={11} />
                            </button>
                          </div>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={dateTime}
                              onChange={(e) => updateVal(2, e.target.value)}
                              className="w-1/2 bg-[#A5D8FF]/5 border border-[#A5D8FF]/20 rounded px-1.5 py-0.5 text-[9px] focus:outline-none"
                              placeholder="Data/Ora"
                            />
                            <input
                              type="text"
                              value={court}
                              onChange={(e) => updateVal(3, e.target.value)}
                              className="w-1/2 bg-[#A5D8FF]/5 border border-[#A5D8FF]/20 rounded px-1.5 py-0.5 text-[9px] focus:outline-none"
                              placeholder="Campo"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>{" "}
              {/* Finale & Vincitore */}
              <div className="space-y-4">
                {" "}
                <div className="text-xs font-bold uppercase text-[#A5D8FF]">
                  Finale
                </div>{" "}
                <div className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-2">
                  {" "}
                  <div className="text-[8px] font-bold text-white/20 uppercase">
                    Match Finale
                  </div>{" "}
                  {[0, 1].map((j) => {
                    const team = editingBracket.final?.[j] || "";
                    const parts = team.split('|');
                    const teamName = parts[0] || "";
                    const score = parts[1] || "";
                    const dateTime = parts[2] || "";
                    const court = parts[3] || "";

                    const updateVal = (idx: number, newVal: string) => {
                      const newBracket = { ...editingBracket };
                      if (!newBracket.final) newBracket.final = Array(2).fill("");
                      const currentParts = [teamName, score, dateTime, court];
                      currentParts[idx] = newVal;
                      newBracket.final[j] = currentParts.join('|');
                      setEditingBracket(newBracket);
                    };

                    return (
                      <div key={j} className="space-y-1.5 p-2 bg-white/5 rounded-lg border border-white/5 mb-2">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={teamName}
                            onChange={(e) => updateVal(0, e.target.value)}
                            className="w-full bg-white/5 px-2 py-1 rounded text-xs focus:outline-none focus:border-[#A5D8FF] border border-transparent text-yellow-500/80 font-bold"
                            placeholder="TBD"
                          />
                          <input
                            type="text"
                            value={score}
                            onChange={(e) => updateVal(1, e.target.value)}
                            className="w-10 bg-white/5 px-1 py-1 rounded text-xs text-center focus:outline-none focus:border-[#A5D8FF] border border-transparent text-yellow-500/80 font-bold"
                            placeholder="Pt."
                          />
                          <button
                            type="button"
                            onClick={() => advanceTeam(teamName, "final", 0)}
                            disabled={!teamName}
                            className="px-1.5 py-1 bg-yellow-500/20 text-yellow-500 rounded hover:bg-yellow-500 hover:text-black disabled:opacity-30 transition-colors"
                            title="Campione!"
                          >
                            <Trophy size={11} />
                          </button>
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={dateTime}
                            onChange={(e) => updateVal(2, e.target.value)}
                            className="w-1/2 bg-[#A5D8FF]/5 border border-[#A5D8FF]/20 rounded px-1.5 py-0.5 text-[9px] focus:outline-none text-yellow-500/60"
                            placeholder="Data/Ora"
                          />
                          <input
                            type="text"
                            value={court}
                            onChange={(e) => updateVal(3, e.target.value)}
                            className="w-1/2 bg-[#A5D8FF]/5 border border-[#A5D8FF]/20 rounded px-1.5 py-0.5 text-[9px] focus:outline-none text-yellow-500/60"
                            placeholder="Campo"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>{" "}
                {/* Finalissima */}
                <div className="p-3 bg-black/40 rounded-xl border border-yellow-500/20 space-y-2 mt-4">
                  {" "}
                  <div className="text-[8px] font-bold text-yellow-500/40 uppercase">
                    Match Finalissima
                  </div>{" "}
                  {[0, 1].map((j) => {
                    const team = editingBracket.finalissima?.[j] || "";
                    const parts = team.split('|');
                    const teamName = parts[0] || "";
                    const score = parts[1] || "";
                    const dateTime = parts[2] || "";
                    const court = parts[3] || "";

                    const updateVal = (idx: number, newVal: string) => {
                      const newBracket = { ...editingBracket };
                      if (!newBracket.finalissima) newBracket.finalissima = Array(2).fill("");
                      const currentParts = [teamName, score, dateTime, court];
                      currentParts[idx] = newVal;
                      newBracket.finalissima[j] = currentParts.join('|');
                      setEditingBracket(newBracket);
                    };

                    return (
                      <div key={`finalissima-${j}`} className="space-y-1.5 p-2 bg-white/5 rounded-lg border border-white/5 mb-2">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={teamName}
                            onChange={(e) => updateVal(0, e.target.value)}
                            className="w-full bg-white/5 px-3 py-1.5 rounded text-xs focus:outline-none focus:border-[#A5D8FF] border border-transparent text-yellow-500/80 font-bold"
                            placeholder="TBD"
                          />
                          <input
                            type="text"
                            value={score}
                            onChange={(e) => updateVal(1, e.target.value)}
                            className="w-10 bg-white/5 px-2 py-1.5 rounded text-xs text-center focus:outline-none focus:border-[#A5D8FF] border border-transparent text-yellow-500/80 font-bold"
                            placeholder="Pt."
                          />
                          <button
                            type="button"
                            onClick={() => advanceTeam(teamName, "finalissima", 0)}
                            disabled={!teamName}
                            className="px-1.5 py-1 bg-yellow-500/20 text-yellow-500 rounded hover:bg-yellow-500 hover:text-black disabled:opacity-30 transition-colors"
                            title="Campione!"
                          >
                            <Trophy size={11} />
                          </button>
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={dateTime}
                            onChange={(e) => updateVal(2, e.target.value)}
                            className="w-1/2 bg-[#A5D8FF]/5 border border-[#A5D8FF]/20 rounded px-1.5 py-0.5 text-[9px] focus:outline-none text-yellow-500/60"
                            placeholder="Data/Ora"
                          />
                          <input
                            type="text"
                            value={court}
                            onChange={(e) => updateVal(3, e.target.value)}
                            className="w-1/2 bg-[#A5D8FF]/5 border border-[#A5D8FF]/20 rounded px-1.5 py-0.5 text-[9px] focus:outline-none text-yellow-500/60"
                            placeholder="Campo"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>{" "}
                {/* Campione Box */}
                <div className="p-4 bg-yellow-500/5 rounded-xl border border-yellow-500/20 space-y-2 mt-4">
                  {" "}
                  <div className="text-xs font-bold uppercase text-yellow-500 flex items-center gap-1">
                    {" "}
                    <Trophy size={12} /> Vincitore (Campione){" "}
                  </div>{" "}
                  <input
                    type="text"
                    value={editingBracket.winner || ""}
                    onChange={(e) => {
                      const newBracket = {
                        ...editingBracket,
                      };
                      newBracket.winner = e.target.value;
                      setEditingBracket(newBracket);
                    }}
                    placeholder="TBD"
                    className="w-full bg-white/5 border border-yellow-500/20 rounded-lg px-3 py-2 text-sm text-yellow-400 font-bold focus:outline-none focus:border-yellow-500"
                  />{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>
        )}
      {viewMode === "iscrizioni" && (
        <div className="grid gap-4">
          {" "}
          {registrations.length === 0 ? (
            <div className="py-20 text-center border border-white/5 bg-white/[0.02] rounded-3xl text-white/20 uppercase text-[10px] font-black tracking-widest">
              {" "}
              Nessuna iscrizione presente{" "}
            </div>
          ) : (
            registrations.map((reg) => (
              <div
                key={reg.id}
                className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl flex flex-col md:flex-row justify-between gap-6 hover:bg-white/[0.05] transition-colors"
              >
                {" "}
                <div className="space-y-2 text-left">
                  {" "}
                  <div className="flex items-center gap-3">
                    {" "}
                    <span className="font-black text-lg text-[#A5D8FF] italic uppercase">
                      {reg.team_name}
                    </span>{" "}
                    <span
                      className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                        reg.status === "accepted"
                          ? "bg-green-500/20 text-green-400"
                          : reg.status === "rejected"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-yellow-500/20 text-yellow-400"
                      }
`}
                    >
                      {" "}
                      {reg.status}
                    </span>{" "}
                  </div>{" "}
                  <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold flex flex-wrap gap-x-4 gap-y-1">
                    {" "}
                    <span>
                      Cap: {reg.p1_name}
                      {reg.p1_surname}
                    </span>{" "}
                    <span>
                      P2: {reg.p2_name}
                      {reg.p2_surname}
                    </span>{" "}
                    <span className="flex items-center gap-1">
                      {" "}
                      <span className="text-white/20">Email:</span>{" "}
                      <a
                        href={`mailto:${reg.email}
`}
                        className="text-[#A5D8FF] hover:underline normal-case"
                      >
                        {reg.email}
                      </a>{" "}
                    </span>{" "}
                    <span className="flex items-center gap-1">
                      {" "}
                      <span className="text-white/20">Tel:</span>{" "}
                      <a
                        href={`tel:${reg.phone}
`}
                        className="text-[#A5D8FF] hover:underline"
                      >
                        {reg.phone}
                      </a>{" "}
                    </span>{" "}
                  </div>{" "}
                </div>{" "}
                <div className="flex items-center gap-2">
                  {" "}
                  <button
                    onClick={() => setEditingReg(reg)}
                    className="p-3 bg-blue-500/10 text-blue-400 rounded-xl hover:bg-blue-500 hover:text-white transition-all cursor-pointer"
                    title="Modifica Iscrizione"
                  >
                    {" "}
                    <Edit3 size={18} />{" "}
                  </button>{" "}
                  <button
                    onClick={() => onUpdateStatus(reg.id, "accepted")}
                    disabled={reg.status === "accepted"}
                    className="p-3 bg-green-500/10 text-green-500 rounded-xl hover:bg-green-500 hover:text-white transition-all disabled:opacity-20 cursor-pointer"
                    title="Accetta Iscrizione"
                  >
                    {" "}
                    <ShieldCheck size={18} />{" "}
                  </button>{" "}
                  <button
                    onClick={() => onUpdateStatus(reg.id, "rejected")}
                    disabled={reg.status === "rejected"}
                    className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all disabled:opacity-20 cursor-pointer"
                    title="Rifiuta Iscrizione"
                  >
                    {" "}
                    <X size={18} />{" "}
                  </button>{" "}
                </div>{" "}
              </div>
            ))
          )}
        </div>
      )}
      {viewMode === "articoli" && (
        <div className="space-y-6">
          {" "}
          <div className="flex justify-between items-center pb-4 border-b border-white/5">
            {" "}
            <h3 className="text-xl font-black italic uppercase text-[#A5D8FF]">
              {" "}
              {editingArticle ? "Modifica Articolo" : "Nuovo Articolo"}
            </h3>{" "}
            <button
              onClick={() => {
                if (isWritingArticle) {
                  setIsWritingArticle(false);
                  setEditingArticle(null);
                  resetArticleForm();
                } else {
                  setIsWritingArticle(true);
                  setEditingArticle(null);
                  resetArticleForm();
                }
              }}
              className="px-6 py-2.5 bg-[#A5D8FF] text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white transition-all shadow-2xl active:scale-95 cursor-pointer"
            >
              {" "}
              {isWritingArticle ? "Chiudi Form" : "+ Nuovo Articolo"}
            </button>{" "}
          </div>{" "}
          {(isWritingArticle || editingArticle) && (
            <motion.div
              initial={{
                opacity: 0,
                y: -20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="bg-white/[0.02] border border-[#A5D8FF]/20 rounded-[32px] p-8 space-y-6"
            >
              {" "}
              <form onSubmit={handleArticleSubmit} className="space-y-6">
                {" "}
                <div className="grid md:grid-cols-2 gap-6">
                  {" "}
                  <div>
                    {" "}
                    <label className="block text-[10px] uppercase font-bold text-white/30 ml-2 mb-2 tracking-[0.2em]">
                      Titolo Articolo
                    </label>{" "}
                    <input
                      value={articleTitle}
                      onChange={(e) => setArticleTitle(e.target.value)}
                      type="text"
                      required
                      placeholder="es. Finale incredibile nella prima giornata"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#A5D8FF] transition-all hover:bg-white/[0.08]"
                    />{" "}
                  </div>{" "}
                  <div>
                    {" "}
                    <label className="block text-[10px] uppercase font-bold text-white/30 ml-2 mb-2 tracking-[0.2em]">
                      Giornata / Categoria
                    </label>{" "}
                    <input
                      value={articleGiornata}
                      onChange={(e) => setArticleGiornata(e.target.value)}
                      type="text"
                      required
                      placeholder="es. 1° Giornata"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#A5D8FF] transition-all hover:bg-white/[0.08]"
                    />{" "}
                  </div>{" "}
                </div>{" "}
                <div>
                  {" "}
                  <label className="block text-[10px] uppercase font-bold text-white/30 ml-2 mb-2 tracking-[0.2em]">
                    Contenuto Articolo
                  </label>{" "}
                  <textarea
                    value={articleContent}
                    onChange={(e) => setArticleContent(e.target.value)}
                    required
                    rows={8}
                    placeholder="Scrivi qui il corpo dell'articolo..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#A5D8FF] transition-all hover:bg-white/[0.08] resize-y"
                  />{" "}
                </div>{" "}
                <button
                  type="submit"
                  className="w-full py-4 bg-[#A5D8FF] text-black font-black uppercase tracking-[0.3em] text-xs rounded-xl hover:bg-white transition-all transform active:scale-[0.98] shadow-2xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  {" "}
                  {editingArticle ? "Salva Modifiche" : "Pubblica Articolo"}
                </button>{" "}
              </form>{" "}
            </motion.div>
          )}
          <div className="grid gap-4">
            {" "}
            {articles.length === 0 ? (
              <div className="py-20 text-center border border-white/5 bg-white/[0.02] rounded-3xl text-white/20 uppercase text-[10px] font-black tracking-widest">
                {" "}
                Nessun articolo presente{" "}
              </div>
            ) : (
              articles.map((art) => (
                <div
                  key={art.id}
                  className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl flex flex-col md:flex-row justify-between gap-6 hover:bg-white/[0.05] transition-colors"
                >
                  {" "}
                  <div className="space-y-2 text-left">
                    {" "}
                    <div className="flex items-center gap-3">
                      {" "}
                      <span className="text-[10px] font-black text-[#A5D8FF] uppercase tracking-widest bg-[#A5D8FF]/10 px-2.5 py-1 rounded-full">
                        {" "}
                        {art.giornata}
                      </span>{" "}
                      <span className="font-black text-lg text-white italic uppercase">
                        {art.title}
                      </span>{" "}
                    </div>{" "}
                    <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">
                      {" "}
                      Pubblicato il:{" "}
                      {new Date(art.created_at).toLocaleDateString("it-IT")}
                    </p>{" "}
                    <p className="text-white/50 text-xs line-clamp-2 max-w-2xl whitespace-pre-line">
                      {art.content}
                    </p>{" "}
                  </div>{" "}
                  <div className="flex items-center gap-2">
                    {" "}
                    <button
                      onClick={() => {
                        setEditingArticle(art);
                        setArticleTitle(art.title);
                        setArticleGiornata(art.giornata);
                        setArticleContent(art.content);
                        setIsWritingArticle(false);
                      }}
                      className="p-3 bg-blue-500/10 text-blue-400 rounded-xl hover:bg-blue-500 hover:text-white transition-all cursor-pointer"
                      title="Modifica Articolo"
                    >
                      {" "}
                      <Edit3 size={18} />{" "}
                    </button>{" "}
                    <button
                      onClick={() => {
                        if (
                          confirm(
                            "Sei sicuro di voler eliminare questo articolo?",
                          )
                        ) {
                          onDeleteArticle(art.id);
                        }
                      }}
                      className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all cursor-pointer"
                      title="Elimina Articolo"
                    >
                      {" "}
                      <Trash2 size={18} />{" "}
                    </button>{" "}
                  </div>{" "}
                </div>
              ))
            )}
          </div>{" "}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
