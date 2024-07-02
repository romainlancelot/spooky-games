export interface AccordionProps {
  question: string
  content: string
}

function Accordion({ question, content }: AccordionProps) {
  return (
    <div className="collapse collapse-plus bg-base-300 my-2">
      <input type="radio" name="faq-accordion" />
      <div className="collapse-title text-xl font-medium">{question}</div>
      <div className="collapse-content">
        <p>{content}</p>
      </div>
    </div>
  )
}

export default Accordion
