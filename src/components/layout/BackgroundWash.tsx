/**
 * Warm fixed background photo + cream wash. Sits behind every route.
 * Photo: late-afternoon autumn maple foliage from Unsplash.
 */
const PHOTO_URL =
  "https://images.unsplash.com/photo-1507371341162-763b5e419408?auto=format&fit=crop&w=2400&q=80";

export function BackgroundWash() {
  return (
    <>
      <div
        aria-hidden
        className="fixed inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${PHOTO_URL})` }}
      />
      <div
        aria-hidden
        className="fixed inset-0 -z-10 bg-background/85 backdrop-blur-sm"
      />
    </>
  );
}
