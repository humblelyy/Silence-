export default function SkeletonGallery() {
  return <div className="project-grid" aria-label="Loading projects">{[1, 2, 3].map(item => <div className="skeleton-card" key={item}><div className="skeleton-block skeleton-media"/><div className="skeleton-block skeleton-line"/><div className="skeleton-block skeleton-line short"/></div>)}</div>;
}
