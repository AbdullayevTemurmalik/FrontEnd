import React, { useState, useEffect } from "react";
import API from "../api/axios";
import { Wallet, Save } from "lucide-react";

const MoliyaCard = () => {
  // LocalStorage-dan tiklash
  const [moliya, setMoliya] = useState(() => {
    const saved = localStorage.getItem("moliya_form");
    return saved ? JSON.parse(saved) : { turi: "kirim", summa: "", izoh: "" };
  });

  useEffect(() => {
    localStorage.setItem("moliya_form", JSON.stringify(moliya));
  }, [moliya]);

  const handleMoliya = async (e) => {
    e.preventDefault();
    try {
      // 1000 dan kichik summa yozilsa 000 qo'shish
      let finalSumma = Number(moliya.summa);
      if (finalSumma < 1000) finalSumma *= 1000;

      const res = await API.post("/moliya/add", {
        ...moliya,
        summa: finalSumma,
      });
      if (res.data.success) {
        alert("Moliya hisobi saqlandi! 💰");
        setMoliya({ turi: "kirim", summa: "", izoh: "" });
        localStorage.removeItem("moliya_form");
      }
    } catch (err) {
      alert("Xatolik yuz berdi!");
    }
  };

  return (
    <div className="container">
      <div className="card moliya-card">
        <div className="card-header">
          <Wallet color="#3498db" size={24} />
          <h3>Moliya (Kirim/Chiqim)</h3>
        </div>
        <form onSubmit={handleMoliya}>
          <label>Amal turi:</label>
          <select
            value={moliya.turi}
            onChange={(e) => setMoliya({ ...moliya, turi: e.target.value })}
          >
            <option value="kirim">Kirim (Pul keldi)</option>
            <option value="chiqim">Chiqim (Xarajat)</option>
          </select>

          <label>Summa (so'm):</label>
          <input
            type="number"
            placeholder="Masalan: 150 yoki 150000"
            value={moliya.summa}
            onChange={(e) => setMoliya({ ...moliya, summa: e.target.value })}
            required
          />

          <label>Izoh:</label>
          <input
            type="text"
            placeholder="Masalan: Qo'y sotildi"
            value={moliya.izoh}
            onChange={(e) => setMoliya({ ...moliya, izoh: e.target.value })}
            required
          />

          <button type="submit" className="btn-save">
            <Save size={18} /> Tasdiqlash
          </button>
        </form>
      </div>
    </div>
  );
};

export default MoliyaCard;
