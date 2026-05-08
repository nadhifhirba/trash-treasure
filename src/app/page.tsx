'use client';

import Link from 'next/link';
import { ArrowRight, Leaf, PackageCheck, Recycle, Sprout, Droplets, TreePine, Wind } from 'lucide-react';
import { useTrashTreasureStore } from '@/lib/store';
import { formatDateTime, wasteEmoji, wasteLabels } from '@/lib/utils';

export default function DashboardPage() {
  const deposits = useTrashTreasureStore((state) => state.deposits);
  const userPoints = useTrashTreasureStore((state) => state.userPoints);

  const totalKg = deposits.reduce((sum, d) => sum + d.weight_kg, 0);
  const recycledBags = deposits.length;
  const savedTrees = Math.max(1, Math.round(totalKg / 12));
  const co2SavedKg = Math.round(totalKg * 1.8);
  const recentDeposits = deposits.slice(0, 5);

  return (
    <div className="space-y-10">
      {/* ═══ HERO ═══ */}
      <section className="hero-nature">
        <div className="relative z-10 max-w-3xl space-y-5">
          <span className="eco-pill">
            <Sprout size={14} /> Aksi hijau dimulai dari pemilahan sampah
          </span>
          <h1
            className="impact-number text-[#E8F0E6]"
            style={{ fontSize: "clamp(48px, 7vw, 80px)", lineHeight: 0.95 }}
          >
            Sampah punya nilai,{" "}
            <span style={{ color: "#22C55E" }}>bumi punya masa depan</span>
          </h1>
          <p className="max-w-xl text-[#7D9A7E] leading-relaxed text-base">
            Pantau poin Anda, limbah yang didaur ulang, dan dampak lingkungan yang sudah tercapai.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/setor" className="btn-primary">
              Setor Sampah <ArrowRight size={16} />
            </Link>
            <Link href="/jemput" className="btn-outline">
              Jadwalkan Jemput
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ IMPACT STATS ═══ */}
      <section className="grid gap-4 sm:grid-cols-3">
        <div className="nature-card text-center">
          <Droplets size={28} className="mx-auto mb-3 text-[#7DD3FC]" />
          <p className="impact-number text-[#22C55E]" style={{ fontSize: "52px" }}>
            {userPoints.toLocaleString('id-ID')}
          </p>
          <p className="text-sm font-bold text-[#E8F0E6]">Total Poin</p>
          <p className="mt-1 text-xs text-[#7D9A7E]">Siap ditukar reward</p>
        </div>
        <div className="nature-card text-center">
          <Recycle size={28} className="mx-auto mb-3 text-[#22C55E]" />
          <p className="impact-number text-[#22C55E]" style={{ fontSize: "52px" }}>
            {totalKg.toFixed(1)} kg
          </p>
          <p className="text-sm font-bold text-[#E8F0E6]">Sampah Didaur Ulang</p>
          <p className="mt-1 text-xs text-[#7D9A7E]">{recycledBags} transaksi</p>
        </div>
        <div className="nature-card text-center">
          <TreePine size={28} className="mx-auto mb-3 text-[#166534]" />
          <p className="impact-number text-[#22C55E]" style={{ fontSize: "52px" }}>
            {savedTrees}
          </p>
          <p className="text-sm font-bold text-[#E8F0E6]">Pohon Terselamatkan</p>
          <p className="mt-1 text-xs text-[#7D9A7E]">{co2SavedKg} kg CO₂ dihindari</p>
        </div>
      </section>

      {/* ═══ RECENT + WHY ═══ */}
      <section className="grid gap-4 sm:grid-cols-2">
        {/* Recent deposits */}
        <div className="nature-card">
          <h3 className="mb-5 text-3xl font-bold text-[#E8F0E6]" style={{ fontFamily: "var(--font-amatic)" }}>
            Setoran Terbaru
          </h3>
          <div className="space-y-2">
            {recentDeposits.length === 0 ? (
              <p className="py-10 text-center text-sm text-[#7D9A7E]">Belum ada setoran</p>
            ) : (
              recentDeposits.map((d) => (
                <div key={d.id} className="deposit-item">
                  <div>
                    <span className="text-sm font-semibold text-[#E8F0E6]">
                      {wasteEmoji[d.type]} {wasteLabels[d.type]}
                    </span>
                    <p className="text-xs text-[#7D9A7E]">
                      {d.weight_kg.toFixed(1)} kg · {formatDateTime(d.date)}
                    </p>
                  </div>
                  <span className="rounded-full bg-[#22C55E]/10 px-3 py-1 text-xs font-bold text-[#22C55E]">
                    +{d.points} pts
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Why it matters */}
        <div className="nature-card">
          <h3 className="mb-5 text-3xl font-bold text-[#E8F0E6]" style={{ fontFamily: "var(--font-amatic)" }}>
            Kenapa Ini Penting
          </h3>
          <div className="space-y-3">
            {[
              { icon: Recycle, title: 'Kurangi sampah tercampur', desc: 'Pemilahan dari rumah memudahkan proses daur ulang.' },
              { icon: PackageCheck, title: 'Nilai ekonomi bertambah', desc: 'Sampah terpilah bisa dikonversi menjadi poin.' },
              { icon: Leaf, title: 'Budaya hijau keluarga', desc: 'Anak-anak belajar kebiasaan yang berkelanjutan.' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="info-card">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#22C55E]/10 text-[#22C55E]">
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#E8F0E6]">{item.title}</p>
                    <p className="text-xs text-[#7D9A7E]">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ BOTTOM CTA ═══ */}
      <section className="cta-section">
        <Wind size={36} className="mx-auto mb-4 text-[#4ADE80]" />
        <p className="impact-number text-white" style={{ fontSize: "clamp(36px, 5vw, 56px)" }}>
          Setiap kilogram berarti
        </p>
        <p className="mx-auto mt-3 max-w-md text-sm text-green-200">
          Bergabunglah dengan ribuan warga Jakarta yang sudah memilah sampah dari rumah.
        </p>
        <Link
          href="/setor"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-[#166534] transition-all hover:bg-green-50 hover:shadow-xl"
        >
          Mulai Setor Sekarang <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
}
