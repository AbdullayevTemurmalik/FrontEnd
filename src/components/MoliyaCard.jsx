import React, { useState } from "react";
import API from "../api/axios";
import { Wallet, Save } from "lucide-react";

const MoliyaCard = () => {
  const [moliya, setMoliya] = useState({ turi: "kirim", summa: "", izoh: "" });

  const handleMoliya = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/moliya/add", moliya);
      if (res.data.success) {
        alert("Moliya hisobi saqlandi! 💰");
        setMoliya({ turi: "kirim", summa: "", izoh: "" });
      }
    } catch (err) {
      alert("Xatolik yuz berdi!");
    }
  };

  return (
    <div className="card moliya-card">
      <div className="card-header">
        <Wallet color="#3498db" size={24} />
        <h3>Moliya (Kirim/Chiqim)</h3>
      </div>
      <form onSubmit={handleMoliya}>
        <select
          value={moliya.turi}
          onChange={(e) => setMoliya({ ...moliya, turi: e.target.value })}
        >
          <option value="kirim">Kirim (Pul keldi)</option>
          <option value="chiqim">Chiqim (Xarajat)</option>
        </select>
        <input
          type="number"
          placeholder="Summa (so'm)"
          value={moliya.summa}
          onChange={(e) => setMoliya({ ...moliya, summa: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Izoh (masalan: Qo'y sotildi)"
          value={moliya.izoh}
          onChange={(e) => setMoliya({ ...moliya, izoh: e.target.value })}
          required
        />
        <button type="submit" className="btn-save">
          <Save size={18} /> Tasdiqlash
        </button>
      </form>
    </div>
  );
};

export default MoliyaCard;
