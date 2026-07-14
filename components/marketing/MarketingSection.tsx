"use client";

import FadeInSection from "@/components/shared/FadeInSection";

type Layout = "centered" | "split" | "centered-card";

interface MarketingSectionProps {
  readonly layout?: Layout;
  readonly heading?: string;
  readonly subheading?: string;
  readonly buttonText?: string;
  readonly onButtonClick?: () => void;
  readonly leftContent?: React.ReactNode;
  readonly rightContent?: React.ReactNode;
  readonly children?: React.ReactNode;
  readonly className?: string;
}

export default function MarketingSection({
  layout = "centered",
  heading,
  subheading,
  buttonText,
  onButtonClick,
  leftContent,
  rightContent,
  children,
  className = "",
}: MarketingSectionProps) {
  const renderContent = () => {
    switch (layout) {
      case "centered":
        return (
          <div className="text-center">
            {heading && <h2 className="text-4xl font-bold mb-4">{heading}</h2>}
            {subheading && <p className="text-gray-600 mb-8 max-w-xl mx-auto">{subheading}</p>}
            {buttonText && (
              <button
                onClick={onButtonClick}
                className="bg-black text-white px-8 py-3 rounded hover:bg-gray-800 transition-colors"
              >
                {buttonText}
              </button>
            )}
            {/* 支持在按钮下方插入自定义内容 */}
            {children && <div className="mt-8">{children}</div>}
          </div>
        );

      case "split":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* 左侧内容 */}
            <div>{leftContent}</div>
            {/* 右侧内容：优先使用 rightContent，否则默认渲染 heading 等 */}
            {rightContent ? (
              <div>{rightContent}</div>
            ) : (
              <div>
                {heading && <h3 className="text-4xl font-bold mb-4">{heading}</h3>}
                {subheading && <p className="text-gray-600 mb-6">{subheading}</p>}
                {buttonText && (
                  <button
                    onClick={onButtonClick}
                    className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors"
                  >
                    {buttonText}
                  </button>
                )}
              </div>
            )}
          </div>
        );

      case "centered-card":
        return (
          <div className="bg-gray-50 p-12 rounded-2xl text-center">
            {heading && <h3 className="text-3xl font-bold mb-4">{heading}</h3>}
            {subheading && <p className="text-gray-600 mb-6">{subheading}</p>}
            {buttonText && (
              <button
                onClick={onButtonClick}
                className="bg-black text-white px-8 py-3 rounded hover:bg-gray-800 transition-colors"
              >
                {buttonText}
              </button>
            )}
            {/* centered-card 也可支持 children */}
            {children && <div className="mt-8">{children}</div>}
          </div>
        );
    }
  };

  return <FadeInSection className={className}>{renderContent()}</FadeInSection>;
}