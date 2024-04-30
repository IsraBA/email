export default function titleToLabel(titles = [], userLabels) {
    const labels = titles.map(title => {
        let lab = userLabels.find(l => l.title === title);
        return lab ? lab : null
    }).filter(l => l);
    return labels;
}