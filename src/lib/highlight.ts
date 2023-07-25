
export const hightLight = (value: string, light: string, type: "full" | "partial") => {
  if (!light) return;
  if (type === "full") {
    const re = new RegExp("\\b(" + light + "\\b)", "igm");
    value = value.replace(
      re,
      '<span class="bg-orange-500 text-white px-[1px] rounded">$1</span>'
    );
  } else {
    const re = new RegExp(light, "igm");
    value = value.replace(
      re,
      '<span class="bg-orange-500 text-white px-1 rounded">$&</span>'
    );
  }

  return value;
};