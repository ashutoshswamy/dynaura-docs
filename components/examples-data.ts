export const categories = ["Feedback", "Async", "Live", "Cards", "Social", "Commerce"] as const;
export type Category = (typeof categories)[number];

export type Example = { id: string; category: Category; title: string; description: string; code: string };

// ponytail: code strings are hand-mirrored in examples-browser.tsx `runs`; keep ids in sync
export const examples: Example[] = [
  {
    id: "saved",
    category: "Feedback",
    title: "Saved",
    description: "The default confirmation. Expands to show a description, then collapses.",
    code: `dynaura.success({ title: "Changes saved", description: "Your profile is up to date." });`,
  },
  {
    id: "declined",
    category: "Feedback",
    title: "Payment declined",
    description: "An error with a recovery action. Clicking the button dismisses the toast.",
    code: `dynaura.error({
  title: "Payment failed",
  description: "Card ending 4242 was declined.",
  button: { title: "Retry", onClick: retry },
});`,
  },
  {
    id: "storage",
    category: "Feedback",
    title: "Storage warning",
    description: "A warning that needs a moment of attention.",
    code: `dynaura.warning({ title: "Storage almost full", description: "92 MB of 100 MB used." });`,
  },
  {
    id: "copied",
    category: "Feedback",
    title: "Link copied",
    description: "A short, quiet confirmation with no description.",
    code: `dynaura.info({ title: "Link copied", duration: 1600 });`,
  },
  {
    id: "promise",
    category: "Async",
    title: "Save with a promise",
    description: "One island morphs from loading to success or error.",
    code: `dynaura.promise(save(), {
  loading: "Saving...",
  success: (data) => ({ title: "Saved", description: \`Version \${data.v}\` }),
  error: { title: "Failed", description: "Check your connection." },
});`,
  },
  {
    id: "upload",
    category: "Async",
    title: "Upload progress",
    description: "A value bar and rolling digits, patched in place, ending in confetti.",
    code: `const id = dynaura.loading({ title: "Uploading", progress: 0 });
onProgress((p) => dynaura.update(id, { progress: p }));
dynaura.update(id, { type: "success", title: "Upload complete", progress: undefined, confetti: true });`,
  },
  {
    id: "undo",
    category: "Async",
    title: "Undo a delete",
    description: "A longer duration and an Undo action. The pattern for reversible deletes.",
    code: `dynaura.info({
  title: "Message deleted",
  duration: 6000,
  button: { title: "Undo", onClick: restore },
});`,
  },
  {
    id: "memo",
    category: "Live",
    title: "Voice memo",
    description: "A sticky live activity with a running timer and a Stop action.",
    code: `dynaura.live({
  title: "Recording voice memo",
  button: { title: "Stop", onClick: stop },
});`,
  },
  {
    id: "music",
    category: "Live",
    title: "Now playing",
    description: "The waveform flavor of a live activity.",
    code: `dynaura.live({ title: "Now playing", kind: "wave", button: { title: "Pause", onClick: pause } });`,
  },
  {
    id: "ride",
    category: "Live",
    title: "Ride arriving",
    description: "A live activity with a trailing ETA slot.",
    code: `dynaura.live({
  title: "Driver arriving",
  trailing: "3 min",
  button: { title: "Call", onClick: call },
});`,
  },
  {
    id: "boarding",
    category: "Cards",
    title: "Boarding pass",
    description: "variant: card with a custom body. Colors follow the theme through CSS variables.",
    code: `dynaura.info({
  title: "Boarding soon",
  trailing: "40 min",
  variant: "card",
  duration: 9000,
  description: <BoardingPass />,
  button: { title: "Show boarding pass", onClick: openPass },
});`,
  },
  {
    id: "delivery",
    category: "Cards",
    title: "Delivery tracker",
    description: "A card that carries a small status summary instead of a paragraph.",
    code: `dynaura.success({
  title: "Out for delivery",
  trailing: "12 min",
  variant: "card",
  duration: 9000,
  description: <DeliveryCard />,
  button: { title: "Track order", onClick: track },
});`,
  },
  {
    id: "message",
    category: "Social",
    title: "New message",
    description: "A preview with a Reply action.",
    code: `dynaura.info({
  title: "Maya sent a message",
  description: "Are we still on for 6?",
  button: { title: "Reply", onClick: reply },
});`,
  },
  {
    id: "queue",
    category: "Social",
    title: "Queued activity",
    description: "Show events one after another instead of replacing the island.",
    code: `dynaura.info({ title: "Invite sent to Maya", queue: true, duration: 1600 });
dynaura.success({ title: "Maya joined", queue: true, duration: 1600 });
dynaura.info({ title: "Workspace ready", queue: true, duration: 1600 });`,
  },
  {
    id: "follow",
    category: "Social",
    title: "Celebrate a follow",
    description: "Confetti for the moments that deserve it. Skipped under reduced motion.",
    code: `dynaura.success({ title: "You followed Maya", confetti: true });`,
  },
  {
    id: "order",
    category: "Commerce",
    title: "Order placed",
    description: "Confirmation with a next step.",
    code: `dynaura.success({
  title: "Order placed",
  description: "Arrives Thursday.",
  confetti: true,
  button: { title: "Track order", onClick: track },
});`,
  },
  {
    id: "cart",
    category: "Commerce",
    title: "Added to cart",
    description: "A fast confirmation that links onward.",
    code: `dynaura.success({
  title: "Added to cart",
  description: "Linen shirt, size M.",
  button: { title: "View cart", onClick: openCart },
});`,
  },
];
