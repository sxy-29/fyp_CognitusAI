import { Tool, ToolContent, ToolHeader, ToolInput, ToolOutput } from '@/components/ai-elements/tool.tsx';
import pythonLogo from '../../assets/pythonicon.webp';

const programmingLanguages = [
    { name: "Python", logo: pythonLogo },
    { name: "jsx", logo: pythonLogo }
]

type CodeBlockProps = {
    title: string;
    code: string;
    language: string;
    codeExplanation: string;
    errorText?: string;
}

function ExpandedCodeBlock({ title, code, language, codeExplanation, errorText }: CodeBlockProps) {
    return (
        <Tool defaultOpen={true} className='bg-muted/100 border-black-200 border-1 rounded-xl'>
            <ToolHeader title={title} />
            <ToolContent>
                <ToolInput input={code} languages={programmingLanguages.find(lang => lang.name.toLowerCase() === language.toLowerCase())} />
                <ToolOutput output={codeExplanation} errorText={errorText} />
            </ToolContent>
        </Tool>
    );
}

export default ExpandedCodeBlock;