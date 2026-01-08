import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";

export default function ConfidenceTrend() {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        fetch("http://localhost:8000/confidence/trend")
            .then(res => res.json())
            .then(d => setData(d.trend))
            .catch(() => setData([]));
    }, []);

    return (
        <div className="bg-card rounded-3xl p-6 shadow-soft animate-fade-up">
            <h3 className="font-display text-lg font-semibold mb-4">Confidence Trend</h3>

            <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis domain={[0, 100]} stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                        <Tooltip
                            contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                            itemStyle={{ color: '#22c55e' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="score"
                            stroke="#22c55e"
                            strokeWidth={3}
                            dot={{ fill: '#22c55e', strokeWidth: 2 }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
