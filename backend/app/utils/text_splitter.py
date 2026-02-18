from langchain_text_splitters import RecursiveCharacterTextSplitter, MarkdownTextSplitter

def chunk_text(document_text: str) -> list[str]:
    """Split the document text into chunks using a markdown-aware splitter."""
    # Markdown-aware
    markdown_splitter = MarkdownTextSplitter(chunk_size=500, chunk_overlap=50)
    chunks = markdown_splitter.split_text(document_text)

    # Generic recursive splitter (tries to split on headings, sentences, paragraphs)
    recursive_splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=50,
        separators=["\n--------\n", "\n## ", "\n", " ", ""]
    )
    chunks = recursive_splitter.split_text(document_text)

    return chunks
