class GlossaryTermTag < Liquid::Tag
  def initialize(tag_name, term_name, tokens)
    super
    @term_name = term_name
  end
  def render(context)
    @term_name
  end
end

Liquid::Template.register_tag('glossary', GlossaryTermTag)
