import re

with open('src/app/admin/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace block 1 (Hero Image)
hero_target = """                        <div className="flex items-center gap-3">
                          <input
                            type="text"
                            value={slide.image || ''}
                            onChange={(e) => {
                              const updated = [...formData.heroSlides];
                              updated[idx].image = e.target.value;
                              setFormData({ ...formData, heroSlides: updated });
                            }}
                            className="flex-1 px-3 py-2 text-xs border border-[#EAE5D9] rounded-lg outline-none"
                          />
                          <label className="px-4 py-2 bg-[#7A1C30] text-white rounded-lg text-xs font-medium cursor-pointer">
                            Upload Photo
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                handleImageFileChange(e, (url) => {
                                  const updated = [...formData.heroSlides];
                                  updated[idx].image = url;
                                  setFormData({ ...formData, heroSlides: updated });
                                })
                              }
                            />
                          </label>
                        </div>"""

hero_repl = """                        <ImageInput
                          value={slide.image || ''}
                          onChange={(url) => {
                            const updated = [...formData.heroSlides];
                            updated[idx].image = url;
                            setFormData({ ...formData, heroSlides: updated });
                          }}
                        />"""

content = content.replace(hero_target, hero_repl)

# Replace block 2 (Categories Image)
cat_target = """                              <div className="flex items-center gap-2">
                                <input
                                  type="text"
                                  value={cat.image || ''}
                                  onChange={(e) => {
                                    const updated = [...(formData.categories || [])];
                                    updated[idx] = { ...updated[idx], image: e.target.value };
                                    setFormData({ ...formData, categories: updated });
                                  }}
                                  placeholder="img:... or URL"
                                  className="flex-1 px-3 py-2 text-xs border border-[#EAE5D9] rounded-lg outline-none"
                                />
                                <label className="px-2.5 py-2 bg-[#7A1C30] text-white rounded-lg text-xs font-medium cursor-pointer whitespace-nowrap">
                                  Upload
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) =>
                                      handleImageFileChange(e, (url) => {
                                        const updated = [...(formData.categories || [])];
                                        updated[idx] = { ...updated[idx], image: url };
                                        setFormData({ ...formData, categories: updated });
                                      })
                                    }
                                  />
                                </label>
                              </div>"""

cat_repl = """                              <ImageInput
                                value={cat.image || ''}
                                onChange={(url) => {
                                  const updated = [...(formData.categories || [])];
                                  updated[idx] = { ...updated[idx], image: url };
                                  setFormData({ ...formData, categories: updated });
                                }}
                              />"""

content = content.replace(cat_target, cat_repl)

# Replace blocks 3 and 4 (Products Image)
prod_target = """                        <div className="flex items-center gap-3">
                          <input
                            type="text"
                            value={prod.image || ''}
                            onChange={(e) => {
                              const updated = [...formData.products];
                              updated[idx].image = e.target.value;
                              setFormData({ ...formData, products: updated });
                            }}
                            className="flex-1 px-3 py-2 text-xs border border-[#EAE5D9] rounded-lg outline-none"
                          />
                          <label className="px-4 py-2 bg-[#7A1C30] text-white rounded-lg text-xs font-medium cursor-pointer">
                            Upload Photo
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                handleImageFileChange(e, (url) => {
                                  const updated = [...formData.products];
                                  updated[idx].image = url;
                                  setFormData({ ...formData, products: updated });
                                })
                              }
                            />
                          </label>
                        </div>"""

prod_repl = """                        <ImageInput
                          value={prod.image || ''}
                          onChange={(url) => {
                            const updated = [...formData.products];
                            updated[idx].image = url;
                            setFormData({ ...formData, products: updated });
                          }}
                        />"""

content = content.replace(prod_target, prod_repl)

with open('src/app/admin/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Replaced image inputs successfully.")
