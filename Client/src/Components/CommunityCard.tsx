import { CheckCircle } from 'lucide-react';
import { FC } from 'react';

type Props = {
    review: {
        url: string;
        title: string;
        rating: number;
        reviewCount: number;
        lastAnalyzed: string;
        categories: string[];
        summary: string;
    };
}

const CommunityCard: FC<Props> = ({ review }) => (
    <div className="bg-white/10 backdrop-blur-xl p-6 md:p-8 rounded-2xl shadow-2xl border border-white/5 hover:bg-white/15 transition-all duration-300">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6">
            <div>
                <h3 className="text-2xl font-semibold text-white mb-2">{review.title}</h3>
                <a href={review.url} className="text-purple-400 hover:text-purple-300 text-sm break-all" target="_blank" rel="noopener noreferrer">
                    {review.url}
                </a>
            </div>
            <div className="md:text-right bg-white/5 px-6 py-3 rounded-xl border border-white/5">
                <div className="text-yellow-400 text-2xl font-bold">{review.rating}/5.0</div>
                <div className="text-white/60">{review.reviewCount} reviews</div>
            </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
            {review.categories.map((category, i) => (
                <span key={i} className="px-4 py-1.5 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full text-white/90 text-sm border border-white/5">
                    {category}
                </span>
            ))}
        </div>
        <p className="text-white/80 text-lg mb-4 leading-relaxed">{review.summary}</p>
        <div className="text-white/50 text-sm flex items-center gap-2">
            <CheckCircle size={16} className="text-purple-400" />
            Last analyzed: {review.lastAnalyzed}
        </div>
    </div>
)

export default CommunityCard;