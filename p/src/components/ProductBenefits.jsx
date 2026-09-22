import React from 'react';
import { CheckCircle2, Shield, HeartPulse, Brain, Eye, Scale, Dumbbell, ShieldCheck } from 'lucide-react';

const BENEFITS_DATA = {
  'D.O.S.E': {
    description: `D.O.S.E is our ultra-premium range of eggs fortified with vitamin D3 (10x more than other eggs) and Omega DHA 3.6.9 (6x times omega 3, 2x times Omega 6 and 1.5x times Omega 9 than other eggs), along with immunity boosters like vitamin E and selenium. Here is what every D.O.S.E egg does for you:`,
    benefits: [
      { id: '01', tag: 'Certified Humane Standards', title: 'Farm to table freshness', desc: 'Comes directly from our farm to your table, with no antibiotics used and testing done throughout to ensure quality and safety.', icon: 'check' },
      { id: '02', tag: 'Same Quality, Every Time', title: 'Makes the immune system stronger', desc: "Packed with immunity boosters like vitamin E and selenium that help build the body's natural defences.", icon: 'shield-check' },
      { id: '03', tag: 'End-to-End Consistency', title: 'Supports brain development', desc: 'Each egg is enriched with significantly higher Omega DHA (omega3 6x times, omega6 is 2x times, omega9 1.5x times) than regular eggs, supporting memory, focus, and brain development in children and adults alike.', icon: 'brain' },
      { id: '04', tag: 'Focus on Feed', title: 'Improves heart health', desc: 'Enriched with Omega DHA 3.6.9 fatty acids that help maintain healthy cholesterol levels and support cardiovascular health.', icon: 'heart' },
      { id: '05', tag: 'Transparency You Can Trust', title: 'Builds muscle and bone strength', desc: 'Fortified with vitamin D3 and high-quality protein, D.O.S.E eggs support strong bones, teeth, and muscles.', icon: 'dumbbell' },
      { id: '06', tag: 'Choice for Different Needs', title: 'Protects vision and skin', desc: 'Rich in vitamin A, which supports healthy eyesight, skin, and cell growth.', icon: 'eye' },
      { id: '07', tag: 'Choice for Different Needs', title: 'Helps in weight management', desc: 'High-quality protein keeps you fuller for longer, making D.O.S.E eggs an easy fit for weight-loss and fitness diets.', icon: 'scale' },
      { id: '08', tag: 'Choice for Different Needs', title: 'Helps prevent diseases and infections', desc: "The combined dose of DHA, vitamin D3, and immunity boosters strengthens the body's fighting capacity every single day.", icon: 'shield' },
    ]
  },
  'Vitamin D3': {
    description: `Our Vitamin D3 Eggs are specially enriched to boost your immunity and bone health, providing a significantly higher dose of essential Vitamin D3 than regular eggs. Here is what every Vitamin D3 egg does for you:`,
    benefits: [
      { id: '01', tag: 'Certified Humane Standards', title: 'Farm to table freshness', desc: 'Comes directly from our farm to your table, with no antibiotics used and testing done throughout to ensure quality and safety.', icon: 'check' },
      { id: '02', tag: 'Stronger Bones & Teeth', title: 'Exceptional bone health', desc: 'Fortified with 3x the Vitamin D3 of regular eggs, directly supporting calcium absorption for stronger bones and teeth.', icon: 'shield-check' },
      { id: '03', tag: 'Immune Support', title: 'Makes the immune system stronger', desc: "Vitamin D3 plays a critical role in immune function, helping the body's defences stay alert and active.", icon: 'brain' },
      { id: '04', tag: 'Focus on Feed', title: 'Improves heart health', desc: 'Healthy fatty acids help maintain healthy cholesterol levels and support cardiovascular health.', icon: 'heart' },
      { id: '05', tag: 'Mood & Energy', title: 'Fights fatigue and mood swings', desc: 'Vitamin D3 deficiency is a major cause of fatigue and low mood. These eggs help keep your energy and spirits high.', icon: 'dumbbell' },
      { id: '06', tag: 'Choice for Different Needs', title: 'Protects vision and skin', desc: 'Rich in vitamin A, which supports healthy eyesight, skin, and cell growth.', icon: 'eye' },
      { id: '07', tag: 'Weight Management', title: 'Helps in weight management', desc: 'High-quality protein keeps you fuller for longer, making these eggs an easy fit for weight-loss and fitness diets.', icon: 'scale' },
      { id: '08', tag: 'Disease Prevention', title: 'Helps prevent diseases and infections', desc: "Adequate Vitamin D3 strengthens the body's fighting capacity and reduces susceptibility to infections every single day.", icon: 'shield' },
    ]
  },
  'Nutri+': {
    description: `Nutri+ Eggs are packed with essential vitamins, minerals, and high-quality protein, delivering a complete nutritional profile in every single egg. Here is what every Nutri+ egg does for you:`,
    benefits: [
      { id: '01', tag: 'Certified Humane Standards', title: 'Farm to table freshness', desc: 'Comes directly from our farm to your table, with no antibiotics used and testing done throughout to ensure quality and safety.', icon: 'check' },
      { id: '02', tag: 'Complete Nutrition', title: 'A full spectrum of nutrients', desc: 'Enriched with a blend of vitamins and minerals covering everything your body needs in one convenient egg.', icon: 'shield-check' },
      { id: '03', tag: 'Brain Health', title: 'Supports brain development', desc: 'Enriched with nutrients supporting memory, focus, and brain development in children and adults alike.', icon: 'brain' },
      { id: '04', tag: 'Heart Health', title: 'Improves heart health', desc: 'Enriched with healthy fatty acids that help maintain healthy cholesterol levels and support cardiovascular health.', icon: 'heart' },
      { id: '05', tag: 'Strength', title: 'Builds muscle and bone strength', desc: 'Fortified with essential minerals and high-quality protein to support strong bones, teeth, and muscles.', icon: 'dumbbell' },
      { id: '06', tag: 'Vision & Skin', title: 'Protects vision and skin', desc: 'Rich in vitamin A, which supports healthy eyesight, skin, and cell growth.', icon: 'eye' },
      { id: '07', tag: 'Weight Management', title: 'Helps in weight management', desc: 'High-quality protein keeps you fuller for longer, making Nutri+ eggs an easy fit for weight-loss and fitness diets.', icon: 'scale' },
      { id: '08', tag: 'Disease Prevention', title: 'Helps prevent diseases and infections', desc: "The combined dose of nutrients and immunity boosters strengthens the body's fighting capacity every single day.", icon: 'shield' },
    ]
  },
  'Gold+': {
    description: `Gold+ Eggs are our finest selection — unmatched in quality with a rich golden yolk that speaks for itself. Every Gold+ egg is naturally superior in nutrients. Here is what every Gold+ egg does for you:`,
    benefits: [
      { id: '01', tag: 'Certified Humane Standards', title: 'Farm to table freshness', desc: 'Comes directly from our farm to your table, with no antibiotics used and testing done throughout to ensure quality and safety.', icon: 'check' },
      { id: '02', tag: 'Superior Quality', title: 'Rich golden yolk — naturally better', desc: 'The deep golden yolk is a natural sign of superior nutrition, indicating higher levels of carotenoids and vitamins.', icon: 'shield-check' },
      { id: '03', tag: 'Brain Health', title: 'Supports brain development', desc: 'Rich in choline and Omega fatty acids, supporting memory, focus, and brain development in children and adults alike.', icon: 'brain' },
      { id: '04', tag: 'Heart Health', title: 'Improves heart health', desc: 'Enriched with healthy fatty acids that help maintain healthy cholesterol levels and support cardiovascular health.', icon: 'heart' },
      { id: '05', tag: 'Strength', title: 'Builds muscle and bone strength', desc: 'Naturally high in protein and vitamin D, Gold+ eggs support strong bones, teeth, and muscles.', icon: 'dumbbell' },
      { id: '06', tag: 'Vision & Skin', title: 'Protects vision and skin', desc: 'Rich in lutein, zeaxanthin, and vitamin A — supporting healthy eyesight, skin, and cell growth.', icon: 'eye' },
      { id: '07', tag: 'Weight Management', title: 'Helps in weight management', desc: 'High-quality protein keeps you fuller for longer, making Gold+ eggs an easy fit for weight-loss and fitness diets.', icon: 'scale' },
      { id: '08', tag: 'Disease Prevention', title: 'Helps prevent diseases and infections', desc: "The concentrated blend of antioxidants and nutrients in Gold+ eggs strengthens the body's fighting capacity every single day.", icon: 'shield' },
    ]
  }
};

const ICONS = {
  check: <CheckCircle2 className="w-5 h-5" />,
  'shield-check': <ShieldCheck className="w-5 h-5" />,
  brain: <Brain className="w-5 h-5" />,
  heart: <HeartPulse className="w-5 h-5" />,
  dumbbell: <Dumbbell className="w-5 h-5" />,
  eye: <Eye className="w-5 h-5" />,
  scale: <Scale className="w-5 h-5" />,
  shield: <Shield className="w-5 h-5" />,
};

function matchProduct(name = '') {
  if (name.includes('D.O.S.E')) return BENEFITS_DATA['D.O.S.E'];
  if (name.includes('Vitamin D3')) return BENEFITS_DATA['Vitamin D3'];
  if (name.includes('Nutri+') || name.includes('Nutri ')) return BENEFITS_DATA['Nutri+'];
  if (name.includes('Gold+') || name.includes('Gold ')) return BENEFITS_DATA['Gold+'];
  return null;
}

export function ProductBenefits({ product }) {
  if (!product) return null;

  const data = matchProduct(product.name);
  if (!data) return null;

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-10">

        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <span className="inline-block bg-brand-primary/10 text-brand-primary text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Why Choose This
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-5">
            Benefits of {product.name}
          </h2>
          <p className="text-gray-500 leading-relaxed text-base">
            {data.description}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {data.benefits.map((b) => (
            <div
              key={b.id}
              className="relative bg-[#FDF8F0] rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              {/* Number watermark */}
              <div className="absolute top-4 right-5 text-5xl font-black text-brand-primary/8 font-serif leading-none select-none">
                {b.id}
              </div>

              {/* Icon */}
              <div className="w-11 h-11 rounded-xl bg-white border border-brand-primary/15 flex items-center justify-center text-brand-primary mb-4 shadow-sm">
                {ICONS[b.icon]}
              </div>

              {/* Tag */}
              <p className="text-[10px] font-extrabold tracking-widest uppercase text-brand-secondary mb-1.5">
                {b.tag}
              </p>

              {/* Title */}
              <h3 className="text-[15px] font-bold text-gray-900 mb-2 leading-snug">
                {b.title}
              </h3>

              {/* Description */}
              <p className="text-xs text-gray-500 leading-relaxed">
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
