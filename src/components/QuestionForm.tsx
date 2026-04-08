"use client";

import RTE from "@/components/RTE";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/Auth";
import { cn } from "@/lib/utils";
import slugify from "@/utils/slugify";
import { IconX } from "@tabler/icons-react";
import { Models, ID } from "appwrite";
import { useRouter } from "next/navigation";
import React from "react";
import { databases, storage } from "@/models/client/config";
import { db, questionAttachmentBucket, questionCollection } from "@/models/name";
import { Confetti } from "@/components/magicui/confetti";

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div
            className={cn(
                "glass-panel relative flex w-full flex-col space-y-2 overflow-hidden rounded-[24px] p-5",
                className
            )}
        >
            {children}
        </div>
    );
};

/**
 * ******************************************************************************
 * ![INFO]: for buttons, refer to https://ui.aceternity.com/components/tailwindcss-buttons
 * ******************************************************************************
 */
const QuestionForm = ({ question }: { question?: Models.Document }) => {
    const { user } = useAuthStore();
    const [tag, setTag] = React.useState("");
    const router = useRouter();

    const [formData, setFormData] = React.useState({
        title: String(question?.title || ""),
        content: String(question?.content || ""),
        authorId: user?.$id,
        tags: new Set((question?.tags || []) as string[]),
        attachment: null as File | null,
    });

    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    const loadConfetti = (timeInMS = 3000) => {
        const end = Date.now() + timeInMS; // 3 seconds
        const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

        const frame = () => {
            if (Date.now() > end) return;

            Confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                startVelocity: 60,
                origin: { x: 0, y: 0.5 },
                colors: colors,
            });
            Confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                startVelocity: 60,
                origin: { x: 1, y: 0.5 },
                colors: colors,
            });

            requestAnimationFrame(frame);
        };

        frame();
    };

    const create = async () => {
        let attachmentId = null;

        if (formData.attachment) {
            const storageResponse = await storage.createFile(
                questionAttachmentBucket,
                ID.unique(),
                formData.attachment
            );
            attachmentId = storageResponse.$id;
        }

        const response = await databases.createDocument(db, questionCollection, ID.unique(), {
            title: formData.title,
            content: formData.content,
            authorId: formData.authorId,
            tags: Array.from(formData.tags),
            attachmentId: attachmentId,
        });

        loadConfetti();

        return response;
    };

    const update = async () => {
        if (!question) throw new Error("Please provide a question");

        const attachmentId = await (async () => {
            if (!formData.attachment) return question?.attachmentId as string;

            await storage.deleteFile(questionAttachmentBucket, question.attachmentId);

            const file = await storage.createFile(
                questionAttachmentBucket,
                ID.unique(),
                formData.attachment
            );

            return file.$id;
        })();

        const response = await databases.updateDocument(db, questionCollection, question.$id, {
            title: formData.title,
            content: formData.content,
            authorId: formData.authorId,
            tags: Array.from(formData.tags),
            attachmentId: attachmentId,
        });

        return response;
    };

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // didn't check for attachment because it's optional in updating
        if (!formData.title || !formData.content || !formData.authorId) {
            setError(() => "Please fill out all fields");
            return;
        }

        setLoading(() => true);
        setError(() => "");

        try {
            const response = question ? await update() : await create();

            router.push(`/questions/${response.$id}/${slugify(formData.title)}`);
        } catch (error: any) {
            setError(() => error.message);
        }

        setLoading(() => false);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const maxWidth = 800; // Resize if needed
            const scaleSize = maxWidth / img.width;
            canvas.width = maxWidth;
            canvas.height = img.height * scaleSize;

            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

            canvas.toBlob((blob) => {
                if (blob) {
                    const compressedFile = new File([blob], file.name, {
                        type: file.type,
                        lastModified: Date.now(),
                    });

                    setFormData((prev) => ({
                        ...prev,
                        attachment: compressedFile,
                    }));
                }
            }, 'image/jpeg', 0.5); // quality: 0.7 (range: 0-1)
        };
        img.src = event.target?.result as string;
    };

    reader.readAsDataURL(file);
};


    return (
        <form className="space-y-4 " onSubmit={submit} >
            {error && (
                <LabelInputContainer>
                    <div className="text-center">
                        <span className="text-red-500">{error}</span>
                    </div>
                </LabelInputContainer>
            )}
            <LabelInputContainer>
                <Label htmlFor="title">
                    Title Address
                    <br />
                    <small>
                        Be specific and imagine you&apos;re asking a question to another person.
                    </small>
                </Label>
                <Input
                    id="title"
                    name="title"
                    placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
                    type="text"
                    className="border-[var(--border)] bg-white/80 text-[var(--text)] placeholder:text-[var(--soft)] dark:bg-white/5"
                    value={formData.title}
                    onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                />
            </LabelInputContainer>
            <LabelInputContainer>
                <Label htmlFor="content">
                    What are the details of your problem?
                    <br />
                    <small>
                        Introduce the problem and expand on what you put in the title. Minimum 20
                        characters.
                    </small>
                </Label>
                <div
                    data-color-mode="light"
                    className="[&_.w-md-editor]:!rounded-[18px] [&_.w-md-editor]:!border [&_.w-md-editor]:!border-[var(--border)] [&_.w-md-editor]:!bg-white/80 [&_.w-md-editor-text]:!text-[var(--text)] [&_.w-md-editor-toolbar]:!border-b-[var(--border)] [&_.w-md-editor-toolbar]:!bg-transparent [&_.w-md-editor-toolbar_button]:!text-[var(--muted)] [&_.wmde-markdown]:!bg-transparent [&_.wmde-markdown]:!text-[var(--text)] dark:[&_.w-md-editor]:!bg-white/5"
                >
                    <RTE
                        value={formData.content}
                        onChange={value => setFormData(prev => ({ ...prev, content: value || "" }))}
                    />
                </div>
            </LabelInputContainer>
            <LabelInputContainer>
                 <Label htmlFor="image">
                    Image
                    <br />
                    <small>
                        Add image to your question to make it more clear and easier to understand.
                    </small>
                </Label>
                <Input
                    id="image"
                    name="image"
                    accept="image/*"
                    className="block w-full rounded-xl border-[var(--border)] bg-white/80 text-sm text-[var(--text)] file:mr-4 file:rounded-full file:border-0 file:bg-[var(--accent-soft)] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[var(--accent)] hover:file:bg-[var(--accent-soft)] dark:bg-white/5"
                    type="file"
                    onChange={handleImageChange}
                />
            </LabelInputContainer>

            <LabelInputContainer>
                <Label htmlFor="tag">
                    Tags
                    <br />
                    <small>
                        Add tags to describe what your question is about. Start typing to see
                        suggestions.
                    </small>
                </Label>
                <div className="flex w-full gap-4">
                    <div className="w-full">
                        <Input
                            id="tag"
                            name="tag"
                            placeholder="e.g. (java c objective-c)"
                            className="border-[var(--border)] bg-white/80 text-[var(--text)] placeholder:text-[var(--soft)] dark:bg-white/5"
                            type="text"
                            value={tag}
                            onChange={e => setTag(() => e.target.value)}
                        />
                    </div>
                    <button
                        className="paper-button paper-button-primary relative shrink-0 px-6 text-sm font-semibold"
                        type="button"
                        onClick={() => {
                            if (tag.length === 0) return;
                            setFormData(prev => ({
                                ...prev,
                                tags: new Set([...Array.from(prev.tags), tag]),
                            }));
                            setTag(() => "");
                        }}
                    >
                        <span className="relative z-20">Add</span>
                    </button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {Array.from(formData.tags).map((tag, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <div className="group relative inline-block rounded-full bg-[var(--accent-soft)] p-px text-xs font-semibold leading-6 text-[var(--accent)] no-underline">
                                <span className="absolute inset-0 overflow-hidden rounded-full">
                                    <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(31,111,98,0.25)_0%,rgba(31,111,98,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                                </span>
                                <div className="relative z-10 flex items-center space-x-2 rounded-full bg-white/90 px-4 py-0.5 ring-1 ring-black/5 dark:bg-black/30 dark:ring-white/10">
                                    <span>{tag}</span>
                                    <button
                                        onClick={() => {
                                            setFormData(prev => ({
                                                ...prev,
                                                tags: new Set(
                                                    Array.from(prev.tags).filter(t => t !== tag)
                                                ),
                                            }));
                                        }}
                                        type="button"
                                    >
                                        <IconX size={12} />
                                    </button>
                                </div>
                                <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent transition-opacity duration-500 group-hover:opacity-40" />
                            </div>
                        </div>
                    ))}
                </div>
            </LabelInputContainer>
            <button
                className="paper-button paper-button-primary px-6 font-medium"
                type="submit"
                disabled={loading}
            >
                {question ? "Update" : "Publish"}
            </button>
        </form>
    );
};

export default QuestionForm;
