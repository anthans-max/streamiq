export const SAMPLE_CSV = `Title,Genre,Streams_M,Watch_Hours_M,Completion_Rate,Rating,Revenue_M,Region
Echoes of Tomorrow,Sci-Fi,142.3,89.1,0.74,8.2,28.4,North America
The Last Harbor,Drama,98.7,61.2,0.82,8.7,19.6,Europe
Neon Dynasty,Action,201.5,112.4,0.61,7.8,40.3,Asia Pacific
Crimson Hollow,Horror,67.4,38.9,0.69,7.4,13.5,North America
Solar Drift,Documentary,44.2,29.8,0.88,9.1,8.8,Global
Midnight Protocol,Thriller,155.8,97.3,0.77,8.4,31.2,North America
Wild Kingdom S3,Reality,312.1,198.6,0.55,7.1,62.4,Global
The Inheritance,Drama,89.3,58.7,0.85,9.0,17.8,Europe
Quantum Falls,Sci-Fi,178.4,103.2,0.71,8.0,35.6,North America
Savage Tide,Action,223.7,131.9,0.63,7.6,44.7,Asia Pacific`;

export type DataRow = Record<string, string | number>;

export function parseCSV(text: string): DataRow[] {
  const lines = text.trim().split("\n");
  const headers = lines[0].split(",").map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const vals = line.split(",").map((v) => v.trim());
    const obj: DataRow = {};
    headers.forEach((h, i) => {
      obj[h] = isNaN(Number(vals[i])) ? vals[i] : parseFloat(vals[i]);
    });
    return obj;
  });
}
